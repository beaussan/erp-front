export class MasterAction {
  static readonly type = '[Master] Add item';
  constructor(public payload: string) {}
}
