import { Action } from '@ngrx/store';

import { ValidationError } from '@common/models';

import { RegistrationForm } from '../../models';

export const REGISTER = '[Auth] Register';
export const REGISTER_SUCCESS = '[Auth] Register Success';
export const REGISTER_FAIL = '[Auth] Register Fail';

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: RegistrationForm) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;
}

export class RegisterFail implements Action {
  readonly type = REGISTER_FAIL;

  constructor(public payload: ValidationError) {}
}

export type RegisterAction = Register | RegisterSuccess | RegisterFail;
