import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Module, ModuleHelpers } from '../../../../types';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  AddEmptyCourseToModule,
  DeleteCourse,
  DeleteModule,
  EditFieldCourse,
  EditModuleName,
} from '../../../../state/maquette.actions';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss'],
})
export class ModuleDetailComponent implements OnInit {
  get module(): Module {
    return this._module;
  }

  @Input() set module(value: Module) {
    this._module = value;
    this.form.setValue({
      name: value.name,
    });
  }
  private _module: Module;

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
    });
  }

  ngOnInit() {}

  getTotalEtu(): number {
    return ModuleHelpers.totalEtu(this._module);
  }

  getTotalEcts(): number {
    return ModuleHelpers.ects(this._module);
  }

  getControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  updateName() {
    const value = this.form.value.name;
    this.sendUpdate(this.module.id, value);
  }

  @Dispatch()
  deleteSelf = (id: string) => new DeleteModule(id);

  @Dispatch()
  deleteCourse = (id: string) => new DeleteCourse(id);

  @Dispatch()
  addCourse = (id: string) => new AddEmptyCourseToModule(id);

  @Dispatch()
  sendUpdate = (moduleId: string, value: string) => new EditModuleName(moduleId, value);
}
