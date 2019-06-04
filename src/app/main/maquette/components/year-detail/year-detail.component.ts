import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Year } from '../../../../types';

@Component({
  selector: 'app-year-detail',
  templateUrl: './year-detail.component.html',
  styleUrls: ['./year-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearDetailComponent implements OnInit {
  @Input() year: Year;

  constructor() {}

  ngOnInit() {
    console.log('Year inited');
  }
}
