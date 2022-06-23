import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QuickStartComponent} from "./quick-start/quick-start.component";
import {MobileComponent} from "./mobile/mobile.component";
import {CustomIconsComponent} from "./custom-icons/custom-icons.component";
import {GeojsonComponent} from "./geojson/geojson.component";
import {ChoroplethComponent} from "./choropleth/choropleth.component";

const routes: Routes = [
  {
    component: QuickStartComponent,
    path: 'quick-start',
  },
  {
    component: MobileComponent,
    path: 'mobile',
  },
  {
    component: CustomIconsComponent,
    path: 'custom-icons',
  },
  {
    component: GeojsonComponent,
    path: 'geojson',
  },
  {
    component: ChoroplethComponent,
    path: 'choropleth',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
