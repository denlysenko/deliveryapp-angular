import { Injectable } from '@angular/core';

import { Go } from '@core/store';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { OrdersService } from '../../services/orders.service';
import {
  CreateOrder,
  CreateOrderFail,
  CreateOrderSuccess,
  OrdersActionTypes,
  UpdateOrder,
  UpdateOrderFail,
  UpdateOrderSuccess
} from '../actions';

const SUCCESS_REDIRECT_PATH = '/orders';

@Injectable()
export class OrdersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly ordersService: OrdersService
  ) {}

  @Effect()
  createOrder$ = this.actions$.pipe(
    ofType(OrdersActionTypes.CREATE),
    map((action: CreateOrder) => action.payload),
    switchMap((order) =>
      this.ordersService.createOrder(order).pipe(
        map(() => new CreateOrderSuccess()),
        catchError((err) => of(new CreateOrderFail(err)))
      )
    )
  );

  @Effect()
  updateOrder$ = this.actions$.pipe(
    ofType(OrdersActionTypes.UPDATE),
    map((action: UpdateOrder) => action.payload),
    switchMap((order) =>
      this.ordersService.updateOrder(order.id, order).pipe(
        map(() => new UpdateOrderSuccess()),
        catchError((err) => of(new UpdateOrderFail(err)))
      )
    )
  );

  @Effect()
  handleOrderSuccess$ = this.actions$.pipe(
    ofType(OrdersActionTypes.CREATE_SUCCESS, OrdersActionTypes.UPDATE_SUCCESS),
    map(() => new Go({ path: [SUCCESS_REDIRECT_PATH] }))
  );
}
