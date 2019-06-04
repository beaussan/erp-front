import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  EditFieldCourse,
  EditModuleName,
  EditSemesterName,
  MaquetteAction,
  MaquetteFetch,
} from './maquette.actions';
import { Maquette, MaquetteHelpers, ModuleHelpers, SemesterHelpers, YearHelpers } from '../types';
import { MaquetteService } from '../services/maquette.service';
import { tap } from 'rxjs/operators';
import { patch, updateItem } from '@ngxs/store/operators';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';
import * as _ from 'lodash';

export class MaquetteStateModel {
  public items: Maquette[];
  public dirtyIds: string[];
}

const reduceChain = (inArray: any[], keys: string[]) =>
  keys.reduce(
    (prev, curr) => prev.reduce((prev2, curr2) => [...prev2, ...(_.get(curr2, curr) || [])], []),
    inArray,
  );

@State<MaquetteStateModel>({
  name: 'maquette',
  defaults: {
    items: [],
    dirtyIds: [],
  },
})
export class MaquetteState {
  @Selector()
  static all(state: MaquetteStateModel): Maquette[] {
    return state.items;
  }

  @Selector()
  static byId(state: MaquetteStateModel): (id: string) => Maquette {
    return (id: string) => state.items.find(val => val._id === id);
  }

  @Selector()
  static dirtyById(state: MaquetteStateModel): (id: string) => boolean {
    return (id: string) => {
      return state.dirtyIds.includes(id);
    };
  }

  constructor(private readonly maquetteService: MaquetteService) {}

  @Action(MaquetteFetch)
  fetchAll(ctx: StateContext<MaquetteStateModel>) {
    return this.maquetteService.getAll().pipe(tap(val => ctx.setState(patch({ items: val }))));
  }

  @Action(EditModuleName)
  @ImmutableContext()
  public updateModuleName(
    ctx: StateContext<MaquetteStateModel>,
    { moduleId, value }: EditModuleName,
  ) {
    ctx.setState((state: MaquetteStateModel) => {
      reduceChain(state.items, ['years', 'semesters', 'modules']).find(
        module => module.id === moduleId,
      ).name = value;

      return state;
    });
  }

  @Action(EditSemesterName)
  @ImmutableContext()
  public updateSemester(
    ctx: StateContext<MaquetteStateModel>,
    { semesterId, value }: EditSemesterName,
  ) {
    ctx.setState((state: MaquetteStateModel) => {
      reduceChain(state.items, ['years', 'semesters']).find(
        semester => semester.id === semesterId,
      ).name = value;

      return state;
    });
  }

  @Action(EditFieldCourse)
  @ImmutableContext()
  public toto(ctx: StateContext<MaquetteStateModel>, { courseId, field, value }: EditFieldCourse) {
    ctx.setState((state: MaquetteStateModel) => {
      reduceChain(state.items, ['years', 'semesters', 'modules', 'courses']).find(
        val => val.id === courseId,
      )[field] = value;
      return state;
    });
  }
}
