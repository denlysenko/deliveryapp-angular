import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { User } from '@auth/models';
import { Roles } from '@common/enums';
import { ListResponse } from '@common/models';
import { CoreState, getSelf } from '@core/store';

import { Order, OrdersFilter } from '../models';
import { OrdersService } from '../services/orders.service';
import { getAllFilters } from '../store';

@Injectable()
export class OrdersResolver implements Resolve<ListResponse<Order>> {
  constructor(
    private ordersService: OrdersService,
    private store: Store<CoreState>
  ) {}

  resolve(): Observable<ListResponse<Order>> {
    return this.store.select(getSelf).pipe(
      filter(user => !!user),
      withLatestFrom(this.store.select(getAllFilters)),
      switchMap(([user, ordersFilter]: [User, OrdersFilter]) =>
        this.ordersService[
          user.role === Roles.CLIENT ? 'getOrdersSelf' : 'getOrders'
        ](ordersFilter)
      ),
      take(1)
    );
  }
}
