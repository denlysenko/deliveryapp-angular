import { Action } from '@ngrx/store';

import { Order } from '../../models/order.model';

export enum OrdersActionTypes {
  CREATE_ORDER = '[Orders] Create Order',
  CREATE_ORDER_SUCCESS = '[Orders] Create Order Success',
  CREATE_ORDER_FAIL = '[Orders] Create Order Fail',
  UPDATE_ORDER = '[Orders] Update Order',
  UPDATE_ORDER_SUCCESS = '[Orders] Update Order Success',
  UPDATE_ORDER_FAIL = '[Orders] Update Order Fail'
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

  constructor(public payload: any) {}
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

  constructor(public payload: any) {}
}

export type OrdersAction =
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderFail
  | UpdateOrder
  | UpdateOrderSuccess
  | UpdateOrderFail;
