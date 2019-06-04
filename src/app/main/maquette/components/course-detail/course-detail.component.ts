import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Course } from '../../../../types';
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
      mat: value.name,
      comun: value.commun,
      totalCours: value.nmbAmphiHour,
      totalTd: value.nmbTdHour,
      nmbGroup: value.nmbGroupTd,
      ects: value.nmbEcts,
      coefCC: value.coefCC,
      coefExam: value.coefExam,
      lenthExam: value.lengthExam,
      examType: value.examType,
      courseEnglish: value.courseEnglish,
      translation: value.englishTranslation,
      ratrappage: value.ratrappage,
    });
  }
  private _course: Course;

  form: FormGroup;

  @HostBinding('class.last') @Input() last = false;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      mat: ['', Validators.required],
      comun: [''],
      totalCours: [0, [Validators.min(0), Validators.required]],
      totalTd: [0, [Validators.min(0), Validators.required]],
      nmbGroup: [0, [Validators.min(0), Validators.required]],
      ects: [0, [Validators.min(0), Validators.required]],
      coefCC: [0, [Validators.min(0), Validators.required, Validators.max(100)]],
      coefExam: [0, [Validators.min(0), Validators.required, Validators.max(100)]],
      lenthExam: [undefined, [Validators.min(0)]],
      examType: [''],
      courseEnglish: [false],
      translation: [''],
      ratrappage: [false],
    });
  }

  ngOnInit() {}

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  update(name: string) {
    const raw = this.form.value;
    const value = this.form.value[name];
    console.log({ value, name, data: this.form.get(name), raw });
    this.sendUpdate(this.course.id, name, value);
  }

  @Dispatch()
  sendUpdate = (course: string, name: string, value: any) =>
    new EditFieldCourse(course, name, value);
}
