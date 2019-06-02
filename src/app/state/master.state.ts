import { State, Action, StateContext } from '@ngxs/store';
import { MasterAction } from './master.actions';

export class MasterStateModel {
  public items: string[];
}

@State<MasterStateModel>({
  name: 'master',
  defaults: {
    items: [],
  },
})
export class MasterState {
  @Action(MasterAction)
  add(ctx: StateContext<MasterStateModel>, action: MasterAction) {
    const state = ctx.getState();
    ctx.setState({ items: [...state.items, action.payload] });
  }
}
