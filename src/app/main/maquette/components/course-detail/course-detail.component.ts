import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Course, CourseHelpers } from '../../../../types';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { EditFieldCourse } from '../../../../state/maquette.actions';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  get course(): Course {
    return this._course;
  }

  @Input() set course(value: Course) {
    this._course = value;
    this.form.setValue({
      name: value.name || '',
      commun: value.commun || '',
      nmbAmphiHour: value.nmbAmphiHour || 0,
      nmbTdHour: value.nmbTdHour || 0,
      nmbGroupTd: value.nmbGroupTd || 0,
      nmbEcts: value.nmbEcts || 0,
      coefCC: value.coefCC || 0,
      coefExam: value.coefExam || 0,
      lengthExam: value.lengthExam || 0,
      examType: value.examType || '',
      courseEnglish: value.courseEnglish || '',
      englishTranslation: value.englishTranslation || '',
      ratrappage: value.ratrappage || false,
      teacher: value.teacher || '',
    });
  }
  private _course: Course;

  form: FormGroup;

  @HostBinding('class.last') @Input() last = false;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      commun: [''],
      nmbAmphiHour: [0, [Validators.min(0), Validators.required]],
      nmbTdHour: [0, [Validators.min(0), Validators.required]],
      nmbGroupTd: [0, [Validators.min(0), Validators.required]],
      nmbEcts: [0, [Validators.min(0), Validators.required]],
      coefCC: [0, [Validators.min(0), Validators.required, Validators.max(100)]],
      coefExam: [0, [Validators.min(0), Validators.required, Validators.max(100)]],
      lengthExam: [undefined, [Validators.min(0)]],
      examType: [''],
      courseEnglish: [false],
      englishTranslation: [''],
      teacher: [''],
      ratrappage: [false],
    });
  }

  getTotalProf(): number {
    return CourseHelpers.totalProf(this.course);
  }

  getTotalEtu(): number {
    return CourseHelpers.totalEtu(this.course);
  }

  ngOnInit() {}

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  update(name: string) {
    const value = this.form.value[name];
    this.sendUpdate(this.course.id, name, value);
  }

  @Dispatch()
  sendUpdate = (course: string, name: string, value: any) =>
    new EditFieldCourse(course, name, value);
}
