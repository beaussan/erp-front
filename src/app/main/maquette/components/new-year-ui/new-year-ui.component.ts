import { Component, Input, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MaquetteNewYear } from '../../../../state/maquette.actions';

@Component({
  selector: 'app-new-year-ui',
  templateUrl: './new-year-ui.component.html',
  styleUrls: ['./new-year-ui.component.scss'],
})
export class NewYearUiComponent implements OnInit {
  @Input() maquetteId: string;

  name = '';

  constructor() {}

  ngOnInit() {}

  add() {
    if (this.name.trim().length === 0) {
      return;
    }
    this.newYear(this.maquetteId, this.name);
    this.name = '';
  }

  @Dispatch()
  newYear = (id: string, name: string) => new MaquetteNewYear(id, name);
}
