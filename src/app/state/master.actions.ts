export class MasterAction {
  static readonly type = '[Master] Add item';
  constructor(public payload: string) {}
}

export class MasterFetch {
  static readonly type = '[Master] fetch all';
  constructor() {}
}

export class MasterDelete {
  static readonly type = '[Master] delete by id';
  constructor(public masterId: string) {}
}
