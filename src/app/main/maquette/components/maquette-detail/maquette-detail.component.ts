import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { Maquette, Master, Year } from '../../../../types';
import { map, switchMap, tap } from 'rxjs/operators';
import { MaquetteState } from '../../../../state/maquette.state';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { LockOrUnlock, MaquetteFetch, SaveMaquetteById } from '../../../../state/maquette.actions';

@Component({
  selector: 'app-maquette-detail',
  templateUrl: './maquette-detail.component.html',
  styleUrls: ['./maquette-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaquetteDetailComponent implements OnInit {
  maquette$: Observable<Maquette>;

  isDirty$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.maquette$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.store.select(MaquetteState.byId).pipe(map(fn => fn(params.get('id')))),
      ),
    );
    this.isDirty$ = this.maquette$.pipe(
      switchMap(val => this.store.select(MaquetteState.dirtyById).pipe(map(fn => fn(val.id)))),
    );
    if (this.store.selectSnapshot(MaquetteState.all).length === 0) {
      this.fetchMaquettes();
    }
  }

  save(id: string) {
    this.saveById(id);
  }

  @Dispatch() saveById = (id: string) => new SaveMaquetteById(id);

  trackByYear(idx: number, year: Year) {
    return year.id;
  }

  @Dispatch()
  fetchMaquettes() {
    return new MaquetteFetch();
  }

  @Dispatch()
  toggleLock = (id: string) => new LockOrUnlock(id);
}
