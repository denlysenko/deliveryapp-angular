import { Action } from '@ngrx/store';

import { User } from '@users/models';

export enum SelfActionTypes {
  LOAD_SELF = '[Core] Load Self',
  LOAD_SELF_SUCCESS = '[Core] Load Self Success',
  LOAD_SELF_FAIL = '[Core] Load Self Fail',
  LOGOUT = '[Core] Logout'
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

export type SelfActions = LoadSelf | LoadSelfSuccess | LoadSelfFail | Logout;
