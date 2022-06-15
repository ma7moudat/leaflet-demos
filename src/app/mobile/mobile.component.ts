import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Map, map, marker, tileLayer} from "leaflet";

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapElement', {static: true}) mapElement!: ElementRef<HTMLElement>

  mapInstance?: Map

  ngAfterViewInit() {
    const mapInstance = map(this.mapElement.nativeElement).fitWorld()
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    this.mapInstance = mapInstance

    mapInstance.on('locationfound', (e) => {
      const radius = e.accuracy
      marker(e.latlng)
        .addTo(mapInstance)
        .bindPopup(`You are with ${radius} meters from this point`)
        .openPopup()
    })

    mapInstance.on('locationerror', (e) => {
      alert(e.message)
    })

    mapInstance.locate({ setView: true, maxZoom: 16})
  }

  ngOnDestroy() {
    this.mapInstance?.off()
    this.mapInstance?.remove()
  }

}
