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
