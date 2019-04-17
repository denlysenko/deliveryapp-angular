import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Action } from '@ngrx/store';

import { Payment } from '../../models';

export enum PaymentsActionTypes {
  SELECT = '[Payments] Select',
  FILTER_CHANGE = '[Payments] Filter Change',
  SORTING_CHANGE = '[Payments] Sorting Change',
  PAGE_CHANGE = '[Payments] Page Change'
}

export class SelectPayment implements Action {
  readonly type = PaymentsActionTypes.SELECT;

  constructor(public payload: Payment | null) {}
}

export class FilterChange implements Action {
  readonly type = PaymentsActionTypes.FILTER_CHANGE;

  constructor(public payload: FilterChangeEvent) {}
}

export class SortingChange implements Action {
  readonly type = PaymentsActionTypes.SORTING_CHANGE;

  constructor(public payload: SortingChangeEvent) {}
}

export class PageChange implements Action {
  readonly type = PaymentsActionTypes.PAGE_CHANGE;

  constructor(public payload: PageChangeEvent) {}
}

export type PaymentsActions =
  | SelectPayment
  | FilterChange
  | SortingChange
  | PageChange;
