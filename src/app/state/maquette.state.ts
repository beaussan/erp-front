import { State, Action, StateContext, Selector } from '@ngxs/store';
import { EditFieldCourse, MaquetteAction, MaquetteFetch } from './maquette.actions';
import { Maquette, MaquetteHelpers, ModuleHelpers, SemesterHelpers, YearHelpers } from '../types';
import { MaquetteService } from '../services/maquette.service';
import { tap } from 'rxjs/operators';
import { patch, updateItem } from '@ngxs/store/operators';
import { ImmutableContext } from '@ngxs-labs/immer-adapter';

export class MaquetteStateModel {
  public items: Maquette[];
  public dirtyIds: string[];
}

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

  @Action(MaquetteAction)
  add(ctx: StateContext<MaquetteStateModel>, action: MaquetteAction) {
    const state = ctx.getState();
  }

  @Action(MaquetteFetch)
  fetchAll(ctx: StateContext<MaquetteStateModel>) {
    return this.maquetteService.getAll().pipe(tap(val => ctx.setState(patch({ items: val }))));
  }

  @Action(EditFieldCourse)
  @ImmutableContext()
  public toto(ctx: StateContext<MaquetteStateModel>, { courseId, field, value }: EditFieldCourse) {
    ctx.setState((state: MaquetteStateModel) => {
      const maquettes = state.items;
      const maquetteOwnerIdx = maquettes.findIndex(maquette =>
        MaquetteHelpers.hasCourse(maquette, courseId),
      );
      const yearOwnerIdx = maquettes[maquetteOwnerIdx].years.findIndex(year =>
        YearHelpers.hasCourse(year, courseId),
      );
      const semesterOwnerIdx = maquettes[maquetteOwnerIdx].years[yearOwnerIdx].semesters.findIndex(
        semester => SemesterHelpers.hasCourse(semester, courseId),
      );
      const moduleOwnerIdx = maquettes[maquetteOwnerIdx].years[yearOwnerIdx].semesters[
        semesterOwnerIdx
      ].modules.findIndex(module => ModuleHelpers.hasCourse(module, courseId));
      const courseIdx = maquettes[maquetteOwnerIdx].years[yearOwnerIdx].semesters[
        semesterOwnerIdx
      ].modules[moduleOwnerIdx].courses.findIndex(course => course.id === courseId);
      console.log('data : ', { value, field });
      console.log(
        'before',
        state.items[maquetteOwnerIdx].years[yearOwnerIdx].semesters[semesterOwnerIdx].modules[
          moduleOwnerIdx
        ].courses[courseIdx],
        state.items[maquetteOwnerIdx].years[yearOwnerIdx].semesters[semesterOwnerIdx].modules[
          moduleOwnerIdx
        ].courses[courseIdx][field],
      );

      state.items[maquetteOwnerIdx].years[yearOwnerIdx].semesters[semesterOwnerIdx].modules[
        moduleOwnerIdx
      ].courses[courseIdx][field] = value;

      console.log(
        'after',
        state.items[maquetteOwnerIdx].years[yearOwnerIdx].semesters[semesterOwnerIdx].modules[
          moduleOwnerIdx
        ].courses[courseIdx],
        state.items[maquetteOwnerIdx].years[yearOwnerIdx].semesters[semesterOwnerIdx].modules[
          moduleOwnerIdx
        ].courses[courseIdx][field],
      );
      return state;
    });
  }
  /*
  @Action(EditFieldCourse)
  updateFieldOfCourse(
    ctx: StateContext<MaquetteStateModel>,
    { courseId, field, value }: EditFieldCourse,
  ) {
    const maquettes = ctx.getState().items;
    const maquetteOwnerIdx = maquettes.findIndex(maquette =>
      MaquetteHelpers.hasCourse(maquette, courseId),
    );
    const yearOwnerIdx = maquettes[maquetteOwnerIdx].years.findIndex(year =>
      YearHelpers.hasCourse(year, courseId),
    );
    const semesterOwnerIdx = maquettes[maquetteOwnerIdx].years[yearOwnerIdx].semesters.findIndex(
      semester => SemesterHelpers.hasCourse(semester, courseId),
    );
    const moduleOwnerIdx = maquettes[maquetteOwnerIdx].years[yearOwnerIdx].semesters[
      semesterOwnerIdx
    ].modules.findIndex(module => ModuleHelpers.hasCourse(module, courseId));
    const courseIdx = maquettes[maquetteOwnerIdx].years[yearOwnerIdx].semesters[
      semesterOwnerIdx
    ].modules[moduleOwnerIdx].courses.findIndex(course => course.id === courseId);

    console.log('data : ', {
      maquetteOwnerIdx,
      yearOwnerIdx,
      semesterOwnerIdx,
      moduleOwnerIdx,
      courseIdx,
      field,
      value,
    });
    const oldCourse =
      maquettes[maquetteOwnerIdx].years[yearOwnerIdx].semesters[semesterOwnerIdx].modules[
        moduleOwnerIdx
      ].courses[courseIdx];
    ctx.setState(
      patch({
        items: updateItem(
          maquetteOwnerIdx,
          patch({
            years: updateItem(
              yearOwnerIdx,
              patch({
                semesters: updateItem(
                  semesterOwnerIdx,
                  patch({
                    modules: updateItem(
                      moduleOwnerIdx,
                      patch({
                        courses: updateItem(
                          courseIdx,
                          patch({
                            [field]: value,
                          }),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    );

    const newCourse =
      ctx.getState().items[maquetteOwnerIdx].years[yearOwnerIdx].semesters[semesterOwnerIdx].modules[
        moduleOwnerIdx
        ].courses[courseIdx];
    console.log('HH', { newCourse, oldCourse });
  }
  f
 */
}
