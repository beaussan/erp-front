export class MaquetteAction {
  static readonly type = '[Maquette] Add item';
  constructor(public payload: string) {}
}

export class MaquetteFetch {
  static readonly type = '[Maquette] fetch all';
  constructor() {}
}

export class MaquetteDelete {
  static readonly type = '[Maquette] delete by id';
  constructor(public maquetteId: string) {}
}

export class EditFieldCourse {
  static readonly type = '[Maquette] update field in course';
  constructor(public courseId: string, public field: string, public value: any) {}
}

export class EditSemesterName {
  static readonly type = '[Maquette] update semester name';
  constructor(public semesterId: string, public value: any) {}
}

export class EditModuleName {
  static readonly type = '[Maquette] update module name';
  constructor(public moduleId: string, public value: any) {}
}

export class DeleteModule {
  static readonly type = '[Maquette] delete one module';
  constructor(public moduleId: string) {}
}

export class DeleteCourse {
  static readonly type = '[Maquette] delete one course';
  constructor(public courseId: string) {}
}

export class AddEmptyCourseToModule {
  static readonly type = '[Maquette] add empty course to module';
  constructor(public moduleId: string) {}
}

export class DeleteSemesterById {
  static readonly type = '[Maquette] Delete semester by id';
  constructor(public semesterId: string) {}
}

export class AddModuleToSemester {
  static readonly type = '[Maquette] Add module to semester';
  constructor(public semesterId: string) {}
}

export class AddNewSemesterToYear {
  static readonly type = '[Maquette] Add a empty semester to a year';
  constructor(public yearId: string) {}
}

export class AddNewExtraToYear {
  static readonly type = '[Maquette] Add an empty extra to the year';
  constructor(public yearId: string) {}
}

export class EditExtraNameById {
  static readonly type = '[Maquette] Edit extra name by id';
  constructor(public extraId: string, public name: string) {}
}

export class DeleteExtraById {
  static readonly type = '[Maquette] Delete extra name by id';
  constructor(public extraId: string) {}
}

export class EditExtraItemField {
  static readonly type = '[Maquette] Edit field of extra item';
  constructor(public itemId: string, public field: string, public value: string) {}
}

export class AddExtraEmptyToModule {
  static readonly type = '[Maquette] Add extra empty to module';
  constructor(public extraId: string) {}
}

export class DeleteExtraItem {
  static readonly type = '[Maquette] Delete extra item in group';
  constructor(public groupId: string, public itemId: string) {}
}

export class MaquetteNewYear {
  static readonly type = '[Maquette] New empty year';
  constructor(public maquetteId: string, public name: string) {}
}

export class MarkAsDirty {
  static readonly type = '[Maquette] Mark as dirty';
  constructor(public id: string) {}
}

export class LockOrUnlock {
  static readonly type = '[Maquette] Lock or unlock';
  constructor(public id: string) {}
}

export class SaveMaquetteById {
  static readonly type = '[Maquette] Save maquette';
  constructor(public id: string) {}
}
