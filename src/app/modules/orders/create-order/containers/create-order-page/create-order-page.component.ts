import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CoreFacade } from '@core/store';

import { Order } from '../../../models';
import { OrdersFacade } from '../../../store';

@Component({
  selector: 'da-create-order-page',
  templateUrl: './create-order-page.component.html',
  styleUrls: ['./create-order-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderPageComponent {
  loading$ = this.ordersFacade.loading$;
  error$ = this.ordersFacade.error$;
  role$ = this.coreFacade.role$;

  constructor(
    private readonly ordersFacade: OrdersFacade,
    private readonly coreFacade: CoreFacade
  ) {}

  create(order: Order) {
    this.ordersFacade.create(order);
  }
}
