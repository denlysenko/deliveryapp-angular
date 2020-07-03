import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { Order } from '../../models';
import { OrdersService } from '../../services/orders.service';

@Injectable()
export class OrderResolver implements Resolve<Order> {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly coreFacade: CoreFacade
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    const id = parseInt(route.paramMap.get('id'), 10);

    return this.coreFacade.self$.pipe(
      switchMap(() => this.ordersService.getOrder(id)),
      take(1)
    );
  }
}
