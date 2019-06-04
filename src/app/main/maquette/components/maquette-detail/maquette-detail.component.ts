import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Maquette } from '../../../../types';
import { map, switchMap } from 'rxjs/operators';
import { MaquetteState } from '../../../../state/maquette.state';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MaquetteFetch } from '../../../../state/maquette.actions';

@Component({
  selector: 'app-maquette-detail',
  templateUrl: './maquette-detail.component.html',
  styleUrls: ['./maquette-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaquetteDetailComponent implements OnInit {
  maquette$: Observable<Maquette>;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.maquette$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.store.select(MaquetteState.byId).pipe(map(fn => fn(params.get('id')))),
      ),
    );
    if (this.store.selectSnapshot(MaquetteState.all).length === 0) {
      this.fetchMaquettes();
    }
  }

  @Dispatch()
  fetchMaquettes() {
    return new MaquetteFetch();
  }
}
