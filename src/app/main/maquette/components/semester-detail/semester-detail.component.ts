import { Component, Input, OnInit } from '@angular/core';
import { Semester, SemesterHelpers } from '../../../../types';

@Component({
  selector: 'app-semester-detail',
  templateUrl: './semester-detail.component.html',
  styleUrls: ['./semester-detail.component.scss'],
})
export class SemesterDetailComponent implements OnInit {
  @Input() semester: Semester;

  constructor() {}

  ngOnInit() {}

  getTotalEtu(): number {
    return SemesterHelpers.totalEtu(this.semester);
  }

  getTotalAmphi(): number {
    return SemesterHelpers.totalAmphi(this.semester);
  }

  getTotalTD(): number {
    return SemesterHelpers.totalTD(this.semester);
  }

  getEcts(): number {
    return SemesterHelpers.ects(this.semester);
  }

  getTotalExam(): number {
    return SemesterHelpers.totalExam(this.semester);
  }
}
