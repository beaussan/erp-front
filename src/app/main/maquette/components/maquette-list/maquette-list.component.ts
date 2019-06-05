import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MaquetteFetch, MaquetteDelete } from '../../../../state/maquette.actions';
import { Select } from '@ngxs/store';
import { MaquetteState } from '../../../../state/maquette.state';
import { Observable } from 'rxjs';
import { Maquette } from '../../../../types';

@Component({
  selector: 'app-maquette-list',
  templateUrl: './maquette-list.component.html',
  styleUrls: ['./maquette-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaquetteListComponent implements OnInit {
  @Select(MaquetteState.all) all$: Observable<Maquette[]>;

  constructor() {}

  ngOnInit() {
    this.fetchMaquettes();
  }

  @Dispatch()
  fetchMaquettes() {
    return new MaquetteFetch();
  }

  @Dispatch()
  deleteMaquette(idMaquette: string) {
    return new MaquetteDelete(idMaquette);
  }

  displayedColumns: string[] = ['name', 'prod', 'actions'];
}
