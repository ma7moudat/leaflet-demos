import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoroplethComponent } from './choropleth.component';



@NgModule({
  declarations: [
    ChoroplethComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChoroplethComponent
  ]
})
export class ChoroplethModule { }
