import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {circleMarker, geoJSON, map, Map, PathOptions, tileLayer} from "leaflet";
import {Feature, LineString} from "geojson";

const geojsonFeature: Feature = {
  "type": "Feature",
  "properties": {
    "name": "Coors Field",
    "amenity": "Baseball Stadium",
    "popupContent": "This is where the Rockies play!"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-104.99404, 39.75621]
  }
};

const myLines: LineString[] = [{
  "type": "LineString",
  "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
  "type": "LineString",
  "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

var myStyle = {
  "color": "#ff7800",
  "weight": 5,
  "opacity": 0.65
};

var states: Feature[] = [{
  "type": "Feature",
  "properties": {"party": "Republican"},
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-104.05, 48.99],
      [-97.22,  48.98],
      [-96.58,  45.94],
      [-104.03, 45.94],
      [-104.05, 48.99]
    ]]
  }
}, {
  "type": "Feature",
  "properties": {"party": "Democrat"},
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-109.05, 41.00],
      [-102.06, 40.99],
      [-102.03, 36.99],
      [-109.04, 36.99],
      [-109.05, 41.00]
    ]]
  }
}];

@Component({
  selector: 'app-geojson',
  templateUrl: './geojson.component.html',
  styleUrls: ['./geojson.component.scss']
})
export class GeojsonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapElement', {static: true}) mapElement!: ElementRef<HTMLElement>

  mapInstance?: Map

  ngAfterViewInit() {
    const mapInstance = map(this.mapElement.nativeElement).setView([39.75621, -104.99404], 5)
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    this.mapInstance = mapInstance

    geoJSON(geojsonFeature, {
      pointToLayer: (geoJsonPoint, latlng) => circleMarker(latlng,{
        radius: 8,
        fillColor: '#ff7800',
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      }),
    }).addTo(mapInstance)

    const myLinesLayer = geoJSON(undefined,{ style: myStyle}).addTo(mapInstance)
    myLines.forEach((line) => myLinesLayer.addData(line))

    const statesLayer = geoJSON(undefined, {
      style(feature): PathOptions {
        switch (feature?.properties?.party) {
          case 'Republic': return { color: '#ff0000'}
          case 'Democrat': return { color: '#0000ff'}
          default: return { color: '#00ff00'}
        }
      }
    }).addTo(mapInstance)
    states.forEach((state) => statesLayer.addData(state))
  }

  ngOnDestroy() {
    this.mapInstance?.off()
    this.mapInstance?.remove()
  }

}
