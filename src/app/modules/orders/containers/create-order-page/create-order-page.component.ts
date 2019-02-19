import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreFacade } from '@core/store';

import { map } from 'rxjs/operators';

import { Order } from '../../models';
import { OrdersFacade } from '../../store';

@Component({
  selector: 'da-create-order-page',
  templateUrl: './create-order-page.component.html',
  styleUrls: ['./create-order-page.component.scss']
})
export class CreateOrderPageComponent {
  loading$ = this.ordersFacade.loading$;
  error$ = this.ordersFacade.error$;
  clients$ = this.route.data.pipe(map(data => data.clients));
  role$ = this.coreFacade.role$;

  constructor(
    private ordersFacade: OrdersFacade,
    private coreFacade: CoreFacade,
    private route: ActivatedRoute
  ) {}

  create(order: Order) {
    this.ordersFacade.create(order);
  }
}
