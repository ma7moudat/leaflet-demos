import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {
  Browser,
  Control,
  DomUtil,
  GeoJSON,
  geoJSON,
  LeafletMouseEvent,
  map,
  Map,
  PathOptions,
  tileLayer
} from "leaflet";
import {statesData} from "./us-states";
import {Feature} from "geojson";

function getColor(d: number) {
  return d > 1000 ? '#800026' :
    d > 500 ? '#BD0026' :
      d > 200 ? '#E31A1C' :
        d > 100 ? '#FC4E2A' :
          d > 50 ? '#FD8D3C' :
            d > 20 ? '#FEB24C' :
              d > 10 ? '#FED976' :
                '#FFEDA0';
}

function style(feature: Feature | undefined): PathOptions {
  return {
    fillColor: getColor(Number(feature?.properties?.['density'] || 0)),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

@Component({
  selector: 'app-choropleth',
  templateUrl: './choropleth.component.html',
  styleUrls: ['./choropleth.component.scss']
})
export class ChoroplethComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapElement', {static: true}) mapElement!: ElementRef<HTMLElement>

  mapInstance?: Map
  geojsonLayer?: GeoJSON

  infoControl = new Control()
  infoDiv = DomUtil.create('div', 'info')

  legendControl = new Control({position: 'bottomright'})
  legendDiv = DomUtil.create('div', 'info legend')

  ngAfterViewInit() {
    const mapInstance = map(this.mapElement.nativeElement).setView([37.8, -96], 4)
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    this.mapInstance = mapInstance

    this.geojsonLayer = geoJSON(statesData, {
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: this.highlightFeature.bind(this),
          mouseout: this.resetHighlight.bind(this),
          click: (e) => mapInstance.fitBounds(e.target.getBounds()),
        })
      },
      style,
    }).addTo(mapInstance)

    this.infoControl.onAdd = () => this.updateInfo()
    this.infoControl.addTo(mapInstance)

    this.legendControl.onAdd = () => {
      const grades = [0, 10, 20, 50, 100, 200, 500, 1000]
      this.legendDiv.innerHTML = grades.map((g, i) => `<i style="background: ${getColor(g + 1)}"></i> ${g} ${grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'}`).join('')
      return this.legendDiv
    }
    this.legendControl.addTo(mapInstance)
  }

  ngOnDestroy() {
    this.mapInstance?.off()
    this.mapInstance?.remove()
  }

  highlightFeature(e: LeafletMouseEvent) {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!Browser.ie && !Browser.opera && !Browser.edge) {
      layer.bringToFront();
    }

    this.updateInfo(layer.feature.properties)
  }

  resetHighlight(e: LeafletMouseEvent) {
    this.geojsonLayer?.resetStyle(e.target)
    this.updateInfo()
  }

  updateInfo(props?: { name: string, density: number }) {
    const content = props
      ? `<b>${props.name}</b><br>${props.density} people / mi<sup>2</sup>`
      : 'Hover over a state'
    this.infoDiv.innerHTML = `<h4>US Population Density</h4>${content}`
    return this.infoDiv
  }

}
