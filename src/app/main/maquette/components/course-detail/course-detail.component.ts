import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Course } from '../../../../types';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  @Input() course: Course;

  @HostBinding('class.last') @Input() last = false;

  constructor() {}

  ngOnInit() {}
}
