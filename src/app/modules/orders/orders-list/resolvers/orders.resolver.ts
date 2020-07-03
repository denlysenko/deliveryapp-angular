import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ListResponse } from '@common/models';

import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';

import { Order, OrdersFilter } from '../../models';
import { OrdersService } from '../../services/orders.service';
import { OrdersFacade } from '../../store';

@Injectable()
export class OrdersResolver implements Resolve<ListResponse<Order>> {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly ordersFacade: OrdersFacade,
    private readonly coreFacade: CoreFacade
  ) {}

  resolve(): Observable<ListResponse<Order>> {
    return this.coreFacade.self$.pipe(
      withLatestFrom(this.ordersFacade.allFilters$),
      switchMap(([_, ordersFilter]: [never, OrdersFilter]) =>
        this.ordersService.getOrders(ordersFilter)
      ),
      take(1)
    );
  }
}
