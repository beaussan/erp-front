import { Component, Input, OnInit } from '@angular/core';
import { Semester } from '../../../../types';

@Component({
  selector: 'app-semester-detail',
  templateUrl: './semester-detail.component.html',
  styleUrls: ['./semester-detail.component.scss'],
})
export class SemesterDetailComponent implements OnInit {
  @Input() semester: Semester;

  constructor() {}

  ngOnInit() {}
}
