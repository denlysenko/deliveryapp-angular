import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Roles } from '@common/enums';
import { CoreState, getSelfRole, Go } from '@core/store';

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
    private actions$: Actions,
    private ordersService: OrdersService,
    private store: Store<CoreState>
  ) {}

  @Effect()
  createOrder$ = this.actions$.pipe(
    ofType(OrdersActionTypes.CREATE),
    map((action: CreateOrder) => action.payload),
    withLatestFrom(this.store.select(getSelfRole)),
    switchMap(([order, role]) => {
      return this.ordersService[
        role === Roles.CLIENT ? 'createOrderSelf' : 'createOrder'
      ](order).pipe(
        map(() => new CreateOrderSuccess()),
        catchError(err => of(new CreateOrderFail(err)))
      );
    })
  );

  @Effect()
  updateOrder$ = this.actions$.pipe(
    ofType(OrdersActionTypes.UPDATE),
    map((action: UpdateOrder) => action.payload),
    withLatestFrom(this.store.select(getSelfRole)),
    switchMap(([order, role]) => {
      return this.ordersService[
        role === Roles.CLIENT ? 'updateOrderSelf' : 'updateOrder'
      ](order.id, order).pipe(
        map(() => new UpdateOrderSuccess()),
        catchError(err => of(new UpdateOrderFail(err)))
      );
    })
  );

  @Effect()
  handleOrderSuccess$ = this.actions$.pipe(
    ofType(OrdersActionTypes.CREATE_SUCCESS, OrdersActionTypes.UPDATE_SUCCESS),
    map(() => new Go({ path: [SUCCESS_REDIRECT_PATH] }))
  );
}
