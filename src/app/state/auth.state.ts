import { State, Action, StateContext } from '@ngxs/store';
import { AuthAction } from './auth.actions';

export class AuthStateModel {
  public items: string[];
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    items: [],
  },
})
export class AuthState {
  @Action(AuthAction)
  add(ctx: StateContext<AuthStateModel>, action: AuthAction) {
    const state = ctx.getState();
    ctx.setState({ items: [...state.items, action.payload] });
  }
}
