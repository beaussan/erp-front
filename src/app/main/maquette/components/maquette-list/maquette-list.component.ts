import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MaquetteFetch, MaquetteDelete, NewMaquette } from '../../../../state/maquette.actions';
import { Select, Store } from '@ngxs/store';
import { MaquetteState } from '../../../../state/maquette.state';
import { Observable } from 'rxjs';
import { Maquette, Master } from '../../../../types';
import { MasterFetch } from '../../../../state/master.actions';
import { MasterState } from '../../../../state/master.state';
import { DeleteModalService } from '../../../../modules/delete-modal/delete-modal.service';

@Component({
  selector: 'app-maquette-list',
  templateUrl: './maquette-list.component.html',
  styleUrls: ['./maquette-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaquetteListComponent implements OnInit {
  @Select(MaquetteState.all) all$: Observable<Maquette[]>;
  @Select(MasterState.all) allMasters$: Observable<Master[]>;

  master: Master;
  year = '';

  constructor(private readonly store: Store, private readonly delServ: DeleteModalService) {}

  ngOnInit() {
    this.fetchMaquettes();
    this.fetchMasters();
  }

  submitYear() {
    if (!this.master || this.year.trim().length === 0) {
      return;
    }
    this.store.dispatch(new NewMaquette(this.master, this.year));
  }

  @Dispatch()
  fetchMaquettes() {
    return new MaquetteFetch();
  }

  @Dispatch()
  fetchMasters() {
    return new MasterFetch();
  }

  deleteMaquette(idMaquette: string) {
    this.delServ.askForConfirmation('Maquette', new MaquetteDelete(idMaquette));
  }

  displayedColumns: string[] = ['name', 'prod', 'actions'];
}
