export class MaquetteAction {
  static readonly type = '[Maquette] Add item';
  constructor(public payload: string) {}
}

export class MaquetteFetch {
  static readonly type = '[Maquette] fetch all';
  constructor() {}
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
