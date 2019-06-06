import { State, Action, StateContext, Selector } from '@ngxs/store';
import { MasterAction, MasterFetch, MasterDelete } from './master.actions';
import { Master } from '../types';
import { MasterService } from '../services/master.service';
import { tap } from 'rxjs/operators';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import * as _ from 'lodash';

export class MasterStateModel {
  public items: Master[];
}

@State<MasterStateModel>({
  name: 'master',
  defaults: {
    items: [],
  },
})
export class MasterState {
  @Selector()
  static all(state: MasterStateModel): Master[] {
    return state.items;
  }

  constructor(private readonly masterService: MasterService) {}

  @Action(MasterFetch)
  fetchAll(ctx: StateContext<MasterStateModel>) {
    return this.masterService.getAll().pipe(tap(val => ctx.setState(patch({ items: val }))));
  }

  @Action(MasterDelete)
  deleteById(ctx: StateContext<MasterStateModel>, { masterId }: MasterDelete) {
    return this.masterService.deleteById(masterId).pipe(
      tap(() =>
        ctx.setState(
          patch({
            items: removeItem(master => master.id === masterId),
          }),
        ),
      ),
    );
  }
}
