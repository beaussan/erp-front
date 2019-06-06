import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Maquette, Year } from '../../../../types';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MaquetteState } from '../../../../state/maquette.state';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  LockOrUnlock,
  MaquetteFetch,
  SaveMaquetteById,
  SaveNewMaquette,
} from '../../../../state/maquette.actions';

@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html',
  styleUrls: ['./course-new.component.scss'],
})
export class CourseNewComponent implements OnInit {
  maquette$: Observable<Maquette>;

  isDirty$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.maquette$ = this.store.select(MaquetteState.newMaquette);
    this.isDirty$ = this.maquette$.pipe(
      switchMap(val => this.store.select(MaquetteState.dirtyById).pipe(map(fn => fn(val.id)))),
    );
    if (this.store.selectSnapshot(MaquetteState.all).length === 0) {
      this.fetchMaquettes();
    }
  }

  @Dispatch()
  save = () => new SaveNewMaquette();

  trackByYear(idx: number, year: Year) {
    return year.id;
  }

  @Dispatch()
  fetchMaquettes() {
    return new MaquetteFetch();
  }
}
