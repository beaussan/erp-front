import { Component, Input, OnInit } from '@angular/core';
import { ItemExtra } from '../../../../types';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { EditExtraItemField } from '../../../../state/maquette.actions';

/*
  hour: number;
  name: string;
  date: string;
 */
@Component({
  selector: 'app-extra-module-item-detail',
  templateUrl: './extra-module-item-detail.component.html',
  styleUrls: ['./extra-module-item-detail.component.scss'],
})
export class ExtraModuleItemDetailComponent implements OnInit {
  get extraModuleDetail(): ItemExtra {
    return this._extraModuleDetail;
  }

  @Input() set extraModuleDetail(value: ItemExtra) {
    this._extraModuleDetail = value;
    this.form.setValue({
      name: value.name,
      hour: value.hour,
      date: value.date,
    });
  }
  private _extraModuleDetail: ItemExtra;

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      hour: 0,
      date: [''],
    });
  }

  ngOnInit() {}

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  update(name: string) {
    const value = this.form.value[name];
    this.sendUpdate(this.extraModuleDetail._id, name, value);
  }

  @Dispatch()
  sendUpdate = (id: string, name: string, value: any) => new EditExtraItemField(id, name, value);
}
