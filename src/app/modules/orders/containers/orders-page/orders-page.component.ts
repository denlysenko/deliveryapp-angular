import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EMPTY } from 'rxjs';
import {
  catchError,
  filter,
  skip,
  switchMap,
  take,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';

import { BaseComponent } from '@base/BaseComponent';
import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';
import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { Order, OrdersFilter } from '../../models';
import { OrdersService } from '../../services/orders.service';
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
  role$ = this.coreFacade.role$;

  constructor(
    private route: ActivatedRoute,
    private ordersFacade: OrdersFacade,
    private coreFacade: CoreFacade,
    private ordersService: OrdersService,
    private loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.count = this.route.snapshot.data.orders.count;
    this.orders = this.route.snapshot.data.orders.rows;
    this.subscribeToFiltersChanges();
  }

  handleFilterChange(event: FilterChangeEvent) {
    this.ordersFacade.doFiltering(event);
  }

  handleSortingChange(event: SortingChangeEvent) {
    this.ordersFacade.sort(event);
  }

  handlePageChange(event: PageChangeEvent) {
    this.ordersFacade.paginate(event);
  }

  private subscribeToFiltersChanges() {
    this.ordersFacade.allFilters$
      .pipe(
        skip(1),
        withLatestFrom(this.role$),
        filter(([_, role]: [never, number]) => role !== null),
        switchMap(([ordersFilter, role]: [OrdersFilter, number]) => {
          this.loaderService.start();
          return this.ordersService[
            role === Roles.CLIENT ? 'getOrdersSelf' : 'getOrders'
          ](ordersFilter).pipe(
            catchError(() => {
              this.loaderService.stop();
              return EMPTY;
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ count, rows }) => {
        this.loaderService.stop();
        this.orders = rows;
        this.count = count;
      });
  }
}
