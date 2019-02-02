import { Action } from '@ngrx/store';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent,
  ValidationError
} from '@common/models';

import { Order } from '../../models/order.model';

export enum OrdersActionTypes {
  CREATE = '[Orders] Create',
  CREATE_SUCCESS = '[Orders] Create Success',
  CREATE_FAIL = '[Orders] Create Fail',
  UPDATE = '[Orders] Update',
  UPDATE_SUCCESS = '[Orders] Update Success',
  UPDATE_FAIL = '[Orders] Update Fail',
  FILTER_CHANGE = '[Orders] Filter Change',
  SORTING_CHANGE = '[Orders] Sorting Change',
  PAGE_CHANGE = '[Orders] Page Change'
}

export class CreateOrder implements Action {
  readonly type = OrdersActionTypes.CREATE;

  constructor(public payload: Order) {}
}

export class CreateOrderSuccess implements Action {
  readonly type = OrdersActionTypes.CREATE_SUCCESS;
}

export class CreateOrderFail implements Action {
  readonly type = OrdersActionTypes.CREATE_FAIL;

  constructor(public payload: ValidationError) {}
}

export class UpdateOrder implements Action {
  readonly type = OrdersActionTypes.UPDATE;

  constructor(public payload: Order) {}
}

export class UpdateOrderSuccess implements Action {
  readonly type = OrdersActionTypes.UPDATE_SUCCESS;
}

export class UpdateOrderFail implements Action {
  readonly type = OrdersActionTypes.UPDATE_FAIL;

  constructor(public payload: ValidationError) {}
}

export class FilterChange implements Action {
  readonly type = OrdersActionTypes.FILTER_CHANGE;

  constructor(public payload: FilterChangeEvent) {}
}

export class SortingChange implements Action {
  readonly type = OrdersActionTypes.SORTING_CHANGE;

  constructor(public payload: SortingChangeEvent) {}
}

export class PageChange implements Action {
  readonly type = OrdersActionTypes.PAGE_CHANGE;

  constructor(public payload: PageChangeEvent) {}
}

export type OrdersActions =
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFail
  | UpdateOrder
  | UpdateOrderSuccess
  | UpdateOrderFail
  | FilterChange
  | SortingChange
  | PageChange;
