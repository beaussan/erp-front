export class MaquetteAction {
  static readonly type = '[Maquette] Add item';
  constructor(public payload: string) {}
}

export class MaquetteFetch {
  static readonly type = '[Maquette] fetch all';
  constructor() {}
}
