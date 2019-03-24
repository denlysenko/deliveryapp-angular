import { User } from '@auth/models';

import { ValidationError } from '@common/models';

import { Action } from '@ngrx/store';

import { PasswordPayload } from '../../models';

export enum ProfileActionTypes {
  UPDATE_PROFILE = '[Profile] Update Profile',
  UPDATE_PROFILE_SUCCESS = '[Profile] Update Profile Success',
  UPDATE_PROFILE_FAIL = '[Profile] Update Profile Fail',
  UPDATE_PASSWORD = '[Profile] Update Password',
  UPDATE_PASSWORD_SUCCESS = '[Profile] Update Password Success',
  UPDATE_PASSWORD_FAIL = '[Profile] Update Password Fail'
}

export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.UPDATE_PROFILE;

  constructor(public payload: User) {}
}

export class UpdateProfileSuccess implements Action {
  readonly type = ProfileActionTypes.UPDATE_PROFILE_SUCCESS;

  constructor(public payload: User) {}
}

export class UpdateProfileFail implements Action {
  readonly type = ProfileActionTypes.UPDATE_PROFILE_FAIL;

  constructor(public payload: ValidationError) {}
}

export class UpdatePassword implements Action {
  readonly type = ProfileActionTypes.UPDATE_PASSWORD;

  constructor(public payload: PasswordPayload) {}
}

export class UpdatePasswordSuccess implements Action {
  readonly type = ProfileActionTypes.UPDATE_PASSWORD_SUCCESS;
}

export class UpdatePasswordFail implements Action {
  readonly type = ProfileActionTypes.UPDATE_PASSWORD_FAIL;

  constructor(public payload: ValidationError) {}
}

export type ProfileActions =
  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileFail
  | UpdatePassword
  | UpdatePasswordSuccess
  | UpdatePasswordFail;
