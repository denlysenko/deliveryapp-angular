import { Action } from '@ngrx/store';

import { RouterPayload } from '../../models';

export enum RouterActionTypes {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward'
}

export class Go implements Action {
  readonly type = RouterActionTypes.GO;

  constructor(public payload: RouterPayload) {}
}

export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export type RouterAction = Go | Back | Forward;
