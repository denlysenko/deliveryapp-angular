import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { take } from 'rxjs/operators';

import { BaseComponent } from '@base/BaseComponent';
import { PageChangeEvent, SortingChangeEvent } from '@common/models';
import { CoreFacade } from '@core/store';

import { Order } from '../../models';
import { OrdersFacade } from '../../store';

@Component({
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent extends BaseComponent implements OnInit {
  orders: Order[];
  count: number;

  filter$ = this.ordersFacade.filter$.pipe(take(1));
  sorting$ = this.ordersFacade.sorting$.pipe(take(1));
  pagination$ = this.ordersFacade.pagination$.pipe(take(1));
  role$ = this.coreFacade.role$.pipe(take(1));

  constructor(
    private route: ActivatedRoute,
    private ordersFacade: OrdersFacade,
    private coreFacade: CoreFacade
  ) {
    super();
  }

  ngOnInit() {
    this.count = this.route.snapshot.data.orders.count;
    this.orders = this.route.snapshot.data.orders.rows;
  }

  sort(event: SortingChangeEvent) {
    this.ordersFacade.sort(event);
  }

  paginate(event: PageChangeEvent) {
    this.ordersFacade.paginate(event);
  }
}
