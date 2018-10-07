import { Action } from '@ngrx/store';

import { User } from '../../models';

export const LOAD_SELF = '[Auth] Load Self';
export const LOAD_SELF_SUCCESS = '[Auth] Load Self Success';
export const LOAD_SELF_FAIL = '[Auth] Load Self Fail';
export const LOGOUT = '[Auth] Logout';

export class LoadSelf implements Action {
  readonly type = LOAD_SELF;
}

export class LoadSelfSuccess implements Action {
  readonly type = LOAD_SELF_SUCCESS;

  constructor(public payload: User) {}
}

export class LoadSelfFail implements Action {
  readonly type = LOAD_SELF_FAIL;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type UserAction = LoadSelf | LoadSelfSuccess | LoadSelfFail | Logout;
