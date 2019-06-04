import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaquetteRoutingModule } from './maquette-routing.module';
import { MaquetteListComponent } from './components/maquette-list/maquette-list.component';
import { MaquetteDetailComponent } from './components/maquette-detail/maquette-detail.component';
import { YearDetailComponent } from './components/year-detail/year-detail.component';
import { ExtraModuleDetailComponent } from './components/extra-module-detail/extra-module-detail.component';
import { ExtraModuleItemDetailComponent } from './components/extra-module-item-detail/extra-module-item-detail.component';
import { SemesterDetailComponent } from './components/semester-detail/semester-detail.component';
import { ModuleDetailComponent } from './components/module-detail/module-detail.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { NgxsModule } from '@ngxs/store';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { EditableModule } from '../../modules/editable/editable.module';

@NgModule({
  declarations: [
    MaquetteListComponent,
    MaquetteDetailComponent,
    YearDetailComponent,
    ExtraModuleDetailComponent,
    ExtraModuleItemDetailComponent,
    SemesterDetailComponent,
    ModuleDetailComponent,
    CourseDetailComponent,
  ],
  imports: [
    FuseSharedModule,
    MaquetteRoutingModule,
    NgxsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    EditableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class MaquetteModule {}
