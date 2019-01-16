import { Action } from '@ngrx/store';

import { ValidationError } from '@common/models';
import { FilterChangeEvent, PageChangeEvent, SortingChangeEvent } from '@core/models';

import { Order } from '../../models/order.model';

export enum OrdersActionTypes {
  CREATE_ORDER = '[Orders] Create Order',
  CREATE_ORDER_SUCCESS = '[Orders] Create Order Success',
  CREATE_ORDER_FAIL = '[Orders] Create Order Fail',
  UPDATE_ORDER = '[Orders] Update Order',
  UPDATE_ORDER_SUCCESS = '[Orders] Update Order Success',
  UPDATE_ORDER_FAIL = '[Orders] Update Order Fail',
  FILTER_CHANGE = '[Orders] Filter Change',
  SORTING_CHANGE = '[Orders] Sorting Change',
  PAGE_CHANGE = '[Orders] Page Change'
}

export class CreateOrder implements Action {
  readonly type = OrdersActionTypes.CREATE_ORDER;

  constructor(public payload: Order) {}
}

export class CreateOrderSuccess implements Action {
  readonly type = OrdersActionTypes.CREATE_ORDER_SUCCESS;
}

export class CreateOrderFail implements Action {
  readonly type = OrdersActionTypes.CREATE_ORDER_FAIL;

  constructor(public payload: ValidationError) {}
}

export class UpdateOrder implements Action {
  readonly type = OrdersActionTypes.UPDATE_ORDER;

  constructor(public payload: Order) {}
}

export class UpdateOrderSuccess implements Action {
  readonly type = OrdersActionTypes.UPDATE_ORDER_SUCCESS;
}

export class UpdateOrderFail implements Action {
  readonly type = OrdersActionTypes.UPDATE_ORDER_FAIL;

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
