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
