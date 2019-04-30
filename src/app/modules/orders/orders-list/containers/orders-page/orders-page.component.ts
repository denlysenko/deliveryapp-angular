import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { OrdersPageBase } from '../../../base/OrdersPageBase';
import { OrdersService } from '../../../services/orders.service';
import { OrdersFacade } from '../../../store';

@Component({
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent extends OrdersPageBase {
  constructor(
    route: ActivatedRoute,
    ordersFacade: OrdersFacade,
    coreFacade: CoreFacade,
    ordersService: OrdersService,
    loaderService: LoaderService
  ) {
    super(route, ordersFacade, coreFacade, ordersService, loaderService);
  }
}
