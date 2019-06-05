import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { DeleteModalService } from './delete-modal.service';
import { NgxsModule } from '@ngxs/store';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [DeleteModalComponent],
  imports: [FuseSharedModule, MatButtonModule, MatDialogModule, NgxsModule, A11yModule],
  providers: [DeleteModalService],
  entryComponents: [DeleteModalComponent],
})
export class DeleteModalModule {}
