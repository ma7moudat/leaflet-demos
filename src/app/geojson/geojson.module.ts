import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeojsonComponent } from './geojson.component';



@NgModule({
  declarations: [
    GeojsonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GeojsonComponent
  ]
})
export class GeojsonModule { }
