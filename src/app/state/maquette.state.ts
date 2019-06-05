import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  AddEmptyCourseToModule,
  DeleteCourse,
  DeleteModule,
  EditFieldCourse,
  EditModuleName,
  EditSemesterName,
  MaquetteAction,
  MaquetteFetch,
} from './maquette.actions';
import {
  Course,
  Maquette,
  MaquetteHelpers,
  Module,
  ModuleHelpers,
  Semester,
  SemesterHelpers,
  Year,
  YearHelpers,
} from '../types';
import { v4 as uuid } from 'uuid';
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

  @Action(AddEmptyCourseToModule)
  @ImmutableContext()
  public addEmptyCourseToModule(
    ctx: StateContext<MaquetteStateModel>,
    { moduleId }: AddEmptyCourseToModule,
  ) {
    ctx.setState((state: MaquetteStateModel) => {
      const module: Module = reduceChain(state.items, ['years', 'semesters', 'modules']).find(
        val => val.id === moduleId,
      );
      const newID = uuid();
      const newCourse: Course = {
        lengthExam: 0,
        commun: '',
        name: '',
        nmbGroupTd: 1,
        nmbAmphiHour: 0,
        nmbTdHour: 0,
        nmbEcts: 0,
        coefCC: 0,
        coefExam: 0,
        examType: '',
        courseEnglish: false,
        englishTranslation: '',
        ratrappage: true,
        _id: newID,
        id: newID,
      };
      console.log(module.courses.length);
      module.courses = [...module.courses, newCourse];
      console.log(module.courses.length);
      return state;
    });
  }

  @Action(DeleteModule)
  @ImmutableContext()
  public deleteModule(ctx: StateContext<MaquetteStateModel>, { moduleId }: DeleteModule) {
    ctx.setState((state: MaquetteStateModel) => {
      const semester: Semester = reduceChain(state.items, ['years', 'semesters']).find(
        (sem: Semester) => !!sem.modules.find(module => module.id === moduleId),
      );
      const moduleIdx = semester.modules.findIndex(mod => mod.id === moduleId);
      semester.modules.splice(moduleIdx, 1);
      return state;
    });
  }

  @Action(DeleteCourse)
  @ImmutableContext()
  public deleteCourse(ctx: StateContext<MaquetteStateModel>, { courseId }: DeleteCourse) {
    ctx.setState((state: MaquetteStateModel) => {
      const module: Module = reduceChain(state.items, ['years', 'semesters', 'modules']).find(
        (mod: Module) => !!mod.courses.find(course => course.id === courseId),
      );
      const courseIdx = module.courses.findIndex(course => course.id === courseId);
      module.courses.splice(courseIdx, 1);
      return state;
    });
  }
}
