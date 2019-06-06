import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaquetteListComponent } from './components/maquette-list/maquette-list.component';
import { MaquetteDetailComponent } from './components/maquette-detail/maquette-detail.component';
import { CourseNewComponent } from './components/course-new/course-new.component';

const routes: Routes = [
  {
    path: 'list',
    component: MaquetteListComponent,
  },
  {
    path: 'detail/new',
    component: CourseNewComponent,
  },
  {
    path: 'detail/:id',
    component: MaquetteDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquetteRoutingModule {}
