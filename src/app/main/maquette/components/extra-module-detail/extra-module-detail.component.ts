import { Component, Input, OnInit } from '@angular/core';
import { ExtraModules } from '../../../../types';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  AddExtraEmptyToModule,
  DeleteExtraById,
  DeleteExtraItem,
  EditExtraNameById,
  EditModuleName,
} from '../../../../state/maquette.actions';

@Component({
  selector: 'app-extra-module-detail',
  templateUrl: './extra-module-detail.component.html',
  styleUrls: ['./extra-module-detail.component.scss'],
})
export class ExtraModuleDetailComponent implements OnInit {
  get extraModule(): ExtraModules {
    return this._extraModule;
  }

  @Input() set extraModule(value: ExtraModules) {
    this._extraModule = value;
    this.form.setValue({
      name: value.name,
    });
  }
  private _extraModule: ExtraModules;

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
    });
  }

  getControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  updateName() {
    const value = this.form.value.name;
    this.sendUpdate(this.extraModule.id, value);
  }

  ngOnInit() {}

  @Dispatch()
  sendUpdate = (moduleId: string, value: string) => new EditExtraNameById(moduleId, value);

  @Dispatch()
  addExtra = (id: string) => new AddExtraEmptyToModule(id);

  @Dispatch()
  deleteSelf = (moduleId: string) => new DeleteExtraById(moduleId);

  @Dispatch()
  deleteItem = (moduleId: string, itemId: string) => new DeleteExtraItem(moduleId, itemId);
}
