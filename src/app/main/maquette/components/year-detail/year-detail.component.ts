import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Year } from '../../../../types';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AddNewExtraToYear, AddNewSemesterToYear } from '../../../../state/maquette.actions';

@Component({
  selector: 'app-year-detail',
  templateUrl: './year-detail.component.html',
  styleUrls: ['./year-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearDetailComponent implements OnInit {
  @Input() year: Year;

  constructor() {}

  ngOnInit() {}

  @Dispatch()
  addNewSemester = (id: string) => new AddNewSemesterToYear(id);

  @Dispatch()
  addNewExtra = (id: string) => new AddNewExtraToYear(id);
}
