import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Roles } from '@common/enums';

import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

import { Order } from '../models';
import { OrdersService } from '../services/orders.service';

@Injectable()
export class OrderResolver implements Resolve<Order> {
  constructor(
    private ordersService: OrdersService,
    private coreFacade: CoreFacade
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    const id = parseInt(route.paramMap.get('id'), 10);

    return this.coreFacade.self$.pipe(
      switchMap(user =>
        user.role === Roles.CLIENT
          ? this.ordersService.getOrdersSelf({ 'filter[id]': id })
          : this.ordersService.getOrder(id)
      ),
      map(res => (res['rows'] ? res['rows'][0] : res)),
      take(1)
    );
  }
}
