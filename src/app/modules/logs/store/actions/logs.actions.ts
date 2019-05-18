import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Action } from '@ngrx/store';

export enum LogsActionTypes {
  FILTER_CHANGE = '[Logs] Filter Change',
  SORTING_CHANGE = '[Logs] Sorting Change',
  PAGE_CHANGE = '[Logs] Page Change'
}

export class FilterChange implements Action {
  readonly type = LogsActionTypes.FILTER_CHANGE;

  constructor(public payload: FilterChangeEvent) {}
}

export class SortingChange implements Action {
  readonly type = LogsActionTypes.SORTING_CHANGE;

  constructor(public payload: SortingChangeEvent) {}
}

export class PageChange implements Action {
  readonly type = LogsActionTypes.PAGE_CHANGE;

  constructor(public payload: PageChangeEvent) {}
}

export type LogsActions = FilterChange | SortingChange | PageChange;
