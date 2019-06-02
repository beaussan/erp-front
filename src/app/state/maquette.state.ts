import { State, Action, StateContext, Selector } from '@ngxs/store';
import { MaquetteAction, MaquetteFetch } from './maquette.actions';
import { Maquette } from '../types';
import { MaquetteService } from '../services/maquette.service';
import { tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';

export class MaquetteStateModel {
  public items: Maquette[];
}

@State<MaquetteStateModel>({
  name: 'maquette',
  defaults: {
    items: [],
  },
})
export class MaquetteState {
  @Selector()
  static all(state: MaquetteStateModel): Maquette[] {
    return state.items;
  }

  @Selector()
  static byId(state: MaquetteStateModel): (id: string) => Maquette {
    return (id: string) => state.items.find(val => val.id === id);
  }

  constructor(private readonly maquetteService: MaquetteService) {}

  @Action(MaquetteAction)
  add(ctx: StateContext<MaquetteStateModel>, action: MaquetteAction) {
    const state = ctx.getState();
  }

  @Action(MaquetteFetch)
  fetchAll(ctx: StateContext<MaquetteStateModel>) {
    return this.maquetteService.getAll().pipe(tap(val => ctx.setState(patch({ items: val }))));
  }
}
