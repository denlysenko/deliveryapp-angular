import { Action } from '@ngrx/store';

import { ValidationError } from '@common/models';

import { LoginError, LoginForm, RegistrationForm } from '../../models';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  REGISTER = '[Auth] Register',
  AUTH_SUCCESS = '[Auth] Auth Success',
  AUTH_FAIL = '[Auth] Auth Fail'
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;

  constructor(public payload: RegistrationForm) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: LoginForm) {}
}

export class AuthSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_SUCCESS;
}

export class AuthFail implements Action {
  readonly type = AuthActionTypes.AUTH_FAIL;

  constructor(public payload: ValidationError | LoginError) {}
}

export type RegisterAction = Register | AuthSuccess | AuthFail;
