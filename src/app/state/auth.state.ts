import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FetchUser, LoginUser, SetToken } from './auth.actions';
import { User } from '../types';
import { AuthService } from '../services/auth.service';
import { patch } from '@ngxs/store/operators';
import { finalize, flatMap, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';

export class AuthStateModel {
  public token: string;
  public user: User;
  public hasTriedToLogin: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: undefined,
    user: undefined,
    hasTriedToLogin: false,
  },
})
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static hasTriedToLogin(state: AuthStateModel): boolean {
    return state.hasTriedToLogin;
  }

  @Selector()
  static userLogged(state: AuthStateModel): boolean {
    return !!state.user;
  }

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user;
  }

  constructor(private readonly authService: AuthService) {}

  @Action(SetToken)
  setToken(ctx: StateContext<AuthStateModel>, { token }: SetToken) {
    ctx.setState(patch({ token }));
  }

  @Action(LoginUser)
  loginUser(ctx: StateContext<AuthStateModel>, { password, email }: LoginUser) {
    return this.authService.loginUser(email, password).pipe(
      flatMap(token => ctx.dispatch(new SetToken(token))),
      flatMap(() => ctx.dispatch(new FetchUser())),
      flatMap(() => ctx.dispatch(new Navigate(['/']))),
    );
  }

  @Action(FetchUser)
  fetchUser(ctx: StateContext<AuthStateModel>) {
    return this.authService.fetchUser().pipe(
      tap(user => ctx.setState(patch({ user }))),
      finalize(() => ctx.setState(patch<AuthStateModel>({ hasTriedToLogin: true }))),
    );
  }
}
