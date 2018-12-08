import { Action } from '@ngrx/store';

import { User } from '@auth/models';

export enum SelfActionTypes {
  LOAD_SELF = '[Auth] Load Self',
  LOAD_SELF_SUCCESS = '[Auth] Load Self Success',
  LOAD_SELF_FAIL = '[Auth] Load Self Fail',
  LOGOUT = '[Auth] Logout'
}

export class LoadSelf implements Action {
  readonly type = SelfActionTypes.LOAD_SELF;
}

export class LoadSelfSuccess implements Action {
  readonly type = SelfActionTypes.LOAD_SELF_SUCCESS;

  constructor(public payload: User) {}
}

export class LoadSelfFail implements Action {
  readonly type = SelfActionTypes.LOAD_SELF_FAIL;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = SelfActionTypes.LOGOUT;
}

export type UserAction = LoadSelf | LoadSelfSuccess | LoadSelfFail | Logout;
