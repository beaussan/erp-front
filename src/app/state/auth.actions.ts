export class FetchUser {
  static readonly type = '[Auth] Fetch user';
  constructor() {}
}

export class SetToken {
  static readonly type = '[Auth] Set user token';
  constructor(public token: string) {}
}

export class LoginUser {
  static readonly type = '[Auth] Login user';
  constructor(public email: string, public password: string) {}
}

export class FailedLoginUser {
  static readonly type = '[Auth] Login failed';
  constructor() {}
}

export class Logout {
  static readonly type = '[Auth] logout';
  constructor() {}
}
