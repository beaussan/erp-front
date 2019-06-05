import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterListComponent } from './components/master-list/master-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: MasterListComponent,
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
export class MasterRoutingModule {}
