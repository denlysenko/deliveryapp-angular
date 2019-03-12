import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreFacade } from '@core/store';

import { map } from 'rxjs/operators';

import { Order } from '../../models';
import { OrdersFacade } from '../../store';

@Component({
  selector: 'da-update-order-page',
  templateUrl: './update-order-page.component.html',
  styleUrls: ['./update-order-page.component.scss']
})
export class UpdateOrderPageComponent {
  order$ = this.route.data.pipe(map(data => data.order));

  loading$ = this.ordersFacade.loading$;
  error$ = this.ordersFacade.error$;
  role$ = this.coreFacade.role$;

  constructor(
    private route: ActivatedRoute,
    private ordersFacade: OrdersFacade,
    private coreFacade: CoreFacade
  ) {}

  back() {
    this.coreFacade.navigateBack();
  }

  save(order: Order) {
    this.ordersFacade.update(order);
  }
}
