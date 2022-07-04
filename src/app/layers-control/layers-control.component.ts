import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {circle, control, layerGroup, map, Map, marker, polygon, popup, tileLayer} from "leaflet";

@Component({
  selector: 'app-layers-control',
  templateUrl: './layers-control.component.html',
  styleUrls: ['./layers-control.component.scss']
})
export class LayersControlComponent  implements AfterViewInit, OnDestroy {
  @ViewChild('mapElement', {static: true}) mapElement!: ElementRef<HTMLElement>

  mapInstance?: Map

  ngAfterViewInit() {
    const littleton = marker([39.61, -105.02]).bindPopup('This is Littleton, Co.')
    const denver = marker([39.74, -104.99]).bindPopup('This is Denver, Co.')
    const aurora = marker([39.73, -104.8]).bindPopup('This is Aurora, Co.')
    const golden = marker([39.77, -105.23]).bindPopup('This is Golden, Co.')

    const cities = layerGroup([littleton, denver, aurora, golden])

    const osm = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    });

    const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    const streets = tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr})

    const mapInstance = map(this.mapElement.nativeElement, {
      center: [39.73, -104.99],
      zoom: 10,
      layers: [osm, cities]
    })

    this.mapInstance = mapInstance

    const baseMaps = {
      'OpenStreetMaps': osm,
      'Mapbox Streets': streets,
    }

    const overlayMaps = {
      'Cities': cities,
    }

    const layersControl = control.layers(baseMaps, overlayMaps).addTo(mapInstance)

    const crownHill = marker([39.75, -105.09]).bindPopup('This is Crown Hill Park')
    const rubyHill = marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park')
    const parks = layerGroup([crownHill, rubyHill])

    const satellite = tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

    layersControl.addBaseLayer(satellite, 'Satellite')
    layersControl.addOverlay(parks, `<span style="color: #090">Parks</span>`)
  }

  ngOnDestroy() {
    this.mapInstance?.off()
    this.mapInstance?.remove()
  }

}
