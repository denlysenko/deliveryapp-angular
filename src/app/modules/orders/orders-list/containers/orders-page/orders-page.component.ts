import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { UserViewService } from '@user-view/user-view.service';

import { OrdersPageBase } from '../../../base/OrdersPageBase';
import { OrdersService } from '../../../services/orders.service';
import { OrdersFacade } from '../../../store';

@Component({
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent extends OrdersPageBase {
  constructor(
    route: ActivatedRoute,
    ordersFacade: OrdersFacade,
    coreFacade: CoreFacade,
    ordersService: OrdersService,
    loaderService: LoaderService,
    private userViewService: UserViewService
  ) {
    super(route, ordersFacade, coreFacade, ordersService, loaderService);
  }

  showUser(id: number) {
    this.userViewService.show(id);
  }
}
