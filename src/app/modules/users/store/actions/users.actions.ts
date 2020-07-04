import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Action } from '@ngrx/store';

import { User } from '../../models';

export enum UsersActionTypes {
  SELECT = '[Users] Select',
  FILTER_CHANGE = '[Users] Filter Change',
  SORTING_CHANGE = '[Users] Sorting Change',
  PAGE_CHANGE = '[Users] Page Change',
  RELOAD = '[Users] Reload'
}

export class SelectUser implements Action {
  readonly type = UsersActionTypes.SELECT;

  constructor(public payload: User | null) {}
}

export class FilterChange implements Action {
  readonly type = UsersActionTypes.FILTER_CHANGE;

  constructor(public payload: FilterChangeEvent) {}
}

export class SortingChange implements Action {
  readonly type = UsersActionTypes.SORTING_CHANGE;

  constructor(public payload: SortingChangeEvent) {}
}

export class PageChange implements Action {
  readonly type = UsersActionTypes.PAGE_CHANGE;

  constructor(public payload: PageChangeEvent) {}
}

export class ReloadUsers implements Action {
  readonly type = UsersActionTypes.RELOAD;
}

export type UsersActions =
  | SelectUser
  | FilterChange
  | SortingChange
  | PageChange
  | ReloadUsers;
