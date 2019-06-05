import { Component, Input, OnInit } from '@angular/core';
import { Semester, SemesterHelpers } from '../../../../types';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  AddModuleToSemester,
  DeleteSemesterById,
  EditFieldCourse,
  EditSemesterName,
} from '../../../../state/maquette.actions';
import { DeleteModalService } from '../../../../modules/delete-modal/delete-modal.service';

@Component({
  selector: 'app-semester-detail',
  templateUrl: './semester-detail.component.html',
  styleUrls: ['./semester-detail.component.scss'],
})
export class SemesterDetailComponent implements OnInit {
  get semester(): Semester {
    return this._semester;
  }

  @Input() set semester(value: Semester) {
    this._semester = value;
    this.form.setValue({
      number: value.number,
    });
  }
  private _semester: Semester;

  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly delServ: DeleteModalService) {
    this.form = this.fb.group({
      number: [0, Validators.min(0)],
    });
  }

  ngOnInit() {}

  getTotalEtu(): number {
    return SemesterHelpers.totalEtu(this._semester);
  }

  getTotalAmphi(): number {
    return SemesterHelpers.totalAmphi(this._semester);
  }

  getTotalTD(): number {
    return SemesterHelpers.totalTD(this._semester);
  }

  getEcts(): number {
    return SemesterHelpers.ects(this._semester);
  }

  getTotalExam(): number {
    return SemesterHelpers.totalExam(this._semester);
  }

  getControl(): FormControl {
    return this.form.get('number') as FormControl;
  }

  updateName() {
    const value = this.form.value.number;
    this.sendUpdate(this.semester.id, value);
  }

  @Dispatch()
  addModule = (id: string) => new AddModuleToSemester(id);

  deleteSelf(id: string) {
    this.delServ.askForConfirmation('Semestre', new DeleteSemesterById(id));
  }

  @Dispatch()
  sendUpdate = (course: string, value: any) => new EditSemesterName(course, value);
}
