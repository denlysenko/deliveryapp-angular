import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { User } from '@auth/models';
import { Roles } from '@common/enums';
import { ListResponse } from '@common/models';
import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';

import { Order, OrdersFilter } from '../models';
import { OrdersService } from '../services/orders.service';
import { OrdersFacade } from '../store';

@Injectable()
export class OrdersResolver implements Resolve<ListResponse<Order>> {
  constructor(
    private ordersService: OrdersService,
    private ordersFacade: OrdersFacade,
    private coreFacade: CoreFacade
  ) {}

  resolve(): Observable<ListResponse<Order>> {
    return this.coreFacade.self$.pipe(
      withLatestFrom(this.ordersFacade.allFilters$),
      switchMap(([user, ordersFilter]: [User, OrdersFilter]) =>
        this.ordersService[
          user.role === Roles.CLIENT ? 'getOrdersSelf' : 'getOrders'
        ](ordersFilter)
      ),
      take(1)
    );
  }
}
