import { Component, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { MasterFetch, MasterDelete } from '../../../../state/master.actions';
import { Select } from '@ngxs/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterState } from '../../../../state/master.state';
import { Observable } from 'rxjs';
import { Master } from '../../../../types';
import { DeleteModalService } from '../../../../modules/delete-modal/delete-modal.service';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss'],
})
export class MasterListComponent implements OnInit {
  @Select(MasterState.all) all$: Observable<Master[]>;

  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly delServ: DeleteModalService) {
    this.form = this.fb.group({
      number: [0, Validators.min(0)],
    });
  }

  ngOnInit() {
    this.fetchMasters();
  }

  @Dispatch()
  fetchMasters() {
    return new MasterFetch();
  }

  deleteSelf(id: string) {
    this.delServ.askForConfirmation('Master', new MasterDelete(id));
  }

  displayedColumns: string[] = ['name', 'description', 'actions'];
}
