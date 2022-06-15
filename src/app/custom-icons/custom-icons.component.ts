import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {icon, IconOptions, map, Map, marker, tileLayer} from "leaflet";

@Component({
  selector: 'app-custom-icons',
  templateUrl: './custom-icons.component.html',
  styleUrls: ['./custom-icons.component.scss']
})
export class CustomIconsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapElement', {static: true}) mapElement!: ElementRef<HTMLElement>

  mapInstance?: Map

  ngAfterViewInit() {
    const mapInstance = map(this.mapElement.nativeElement).setView([51.505, -0.09], 13)
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    this.mapInstance = mapInstance

    const iconOptions: IconOptions = {
      iconUrl: '',
      shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    }

    const greenIcon = icon({
      ...iconOptions, iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    })
    const redIcon = icon({
      ...iconOptions, iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
    })
    const orangeIcon = icon({
      ...iconOptions, iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
    })

    marker([51.5, -0.09], {icon: greenIcon}).addTo(mapInstance)
    marker([51.495, -0.083], {icon: redIcon}).addTo(mapInstance)
    marker([51.49, -0.1], {icon: orangeIcon}).addTo(mapInstance)
  }

  ngOnDestroy() {
    this.mapInstance?.off()
    this.mapInstance?.remove()
  }

}
