import { Action } from '@ngrx/store';

import { User } from '../../models';

export const LOAD_USER = '[Auth] Load User';
export const LOAD_USER_SUCCESS = '[Auth] Load User Success';
export const LOAD_USER_FAIL = '[Auth] Load User Fail';
export const LOGOUT = '[Auth] Logout';

export class LoadUser implements Action {
  readonly type = LOAD_USER;
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class LoadUserFail implements Action {
  readonly type = LOAD_USER_FAIL;

  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type UserAction = LoadUser | LoadUserSuccess | LoadUserFail | Logout;
