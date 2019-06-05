import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { MasterListComponent } from './components/master-list/master-list.component';
import { MatTableModule, MatMenuModule, MatButtonModule } from '@angular/material';
import { MasterDetailComponent } from './components/master-detail/master-detail.component';

@NgModule({
  declarations: [MasterListComponent, MasterDetailComponent],
  imports: [CommonModule, MasterRoutingModule, MatTableModule, MatMenuModule, MatButtonModule],
})
export class MasterModule {}
