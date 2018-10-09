import { Action } from '@ngrx/store';

import { LoginError, LoginForm } from '../../models';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginForm) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: LoginError) {}
}

export type LoginAction = Login | LoginSuccess | LoginFail;
