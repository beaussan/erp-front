import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaquetteRoutingModule } from './maquette-routing.module';
import { MaquetteListComponent } from './components/maquette-list/maquette-list.component';
import { MaquetteDetailComponent } from './components/maquette-detail/maquette-detail.component';

@NgModule({
  declarations: [MaquetteListComponent, MaquetteDetailComponent],
  imports: [
    CommonModule,
    MaquetteRoutingModule
  ]
})
export class MaquetteModule { }
