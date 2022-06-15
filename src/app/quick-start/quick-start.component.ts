import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {circle, map, Map, marker, polygon, popup, tileLayer} from 'leaflet';

@Component({
  selector: 'app-quick-start',
  templateUrl: './quick-start.component.html',
  styleUrls: ['./quick-start.component.scss']
})
export class QuickStartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapElement', {static: true}) mapElement!: ElementRef<HTMLElement>

  mapInstance?: Map

  ngAfterViewInit() {
    const mapInstance = map(this.mapElement.nativeElement).setView([51.505, -0.09], 13)
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    this.mapInstance = mapInstance

    const markerInstance = marker([51.5, -0.09]).addTo(mapInstance)

    const circleInstance = circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(mapInstance)

    const polygonInstance = polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047],
    ]).addTo(mapInstance)

    markerInstance.bindPopup('<b>Marker</b> popup').openPopup()
    circleInstance.bindPopup('Circle popup')
    polygonInstance.bindPopup('Polygon popup')

    const popupInstance = popup().setLatLng([51.513, -0.09]).setContent('Standalone popup').openOn(mapInstance)

    mapInstance.on('click', (e) => {
      popupInstance
        .setLatLng(e.latlng)
        .setContent(`${e.latlng}`)
        .openOn(mapInstance)
    })
  }

  ngOnDestroy() {
    this.mapInstance?.off()
    this.mapInstance?.remove()
  }

}
