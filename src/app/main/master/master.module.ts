import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { MasterListComponent } from './components/master-list/master-list.component';
import { MatTableModule, 
  MatMenuModule, 
  MatButtonModule,
  MatDialogModule,
 } from '@angular/material';
import { DeleteModalModule } from '../../modules/delete-modal/delete-modal.module';

@NgModule({
  declarations: [MasterListComponent],
  imports: [CommonModule, 
    MasterRoutingModule, 
    DeleteModalModule,
    MatTableModule, 
    MatMenuModule, 
    MatButtonModule,
    MatDialogModule,
  ]
})
export class MasterModule {}
