import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent,
  ValidationError
} from '@common/models';

import { Action } from '@ngrx/store';

import { Payment } from '../../models';

export enum PaymentsActionTypes {
  CREATE = '[Payments] Create',
  CREATE_SUCCESS = '[Payments] Create Success',
  CREATE_FAIL = '[Payments] Create Fail',
  UPDATE = '[Payments] Update',
  UPDATE_SUCCESS = '[Payments] Update Success',
  UPDATE_FAIL = '[Payments] Update Fail',
  SELECT = '[Payments] Select',
  FILTER_CHANGE = '[Payments] Filter Change',
  SORTING_CHANGE = '[Payments] Sorting Change',
  PAGE_CHANGE = '[Payments] Page Change'
}

export class CreatePayment implements Action {
  readonly type = PaymentsActionTypes.CREATE;

  constructor(public payload: Payment) {}
}

export class CreatePaymentSuccess implements Action {
  readonly type = PaymentsActionTypes.CREATE_SUCCESS;
}

export class CreatePaymentFail implements Action {
  readonly type = PaymentsActionTypes.CREATE_FAIL;

  constructor(public payload: ValidationError) {}
}

export class UpdatePayment implements Action {
  readonly type = PaymentsActionTypes.UPDATE;

  constructor(public payload: Payment) {}
}

export class UpdatePaymentSuccess implements Action {
  readonly type = PaymentsActionTypes.UPDATE_SUCCESS;
}

export class UpdatePaymentFail implements Action {
  readonly type = PaymentsActionTypes.UPDATE_FAIL;

  constructor(public payload: ValidationError) {}
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
  | CreatePayment
  | CreatePaymentSuccess
  | CreatePaymentFail
  | UpdatePayment
  | UpdatePaymentSuccess
  | UpdatePaymentFail
  | SelectPayment
  | FilterChange
  | SortingChange
  | PageChange;
