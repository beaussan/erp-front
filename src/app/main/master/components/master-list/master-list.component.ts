import { Component, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MasterFetch, MasterDelete } from '../../../../state/master.actions';
import { Select } from '@ngxs/store';
import { MasterState } from '../../../../state/master.state';
import { Observable } from 'rxjs';
import { Master } from '../../../../types';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss'],
})
export class MasterListComponent implements OnInit {
  @Select(MasterState.all) all$: Observable<Master[]>;

  constructor() {}

  ngOnInit() {
    this.fetchMasters();
  }

  @Dispatch()
  fetchMasters() {
    return new MasterFetch();
  }

  @Dispatch()
  deleteMaster(idMaster: string) {
    return new MasterDelete(idMaster);
  }

  displayedColumns: string[] = ['name', 'description', 'actions'];
}
