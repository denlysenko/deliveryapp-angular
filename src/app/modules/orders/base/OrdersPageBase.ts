import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '@base/BaseComponent';

import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { EMPTY } from 'rxjs';
import {
  catchError,
  filter,
  skip,
  switchMap,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';

import { Order, OrdersFilter } from '../models';
import { OrdersService } from '../services/orders.service';
import { OrdersFacade } from '../store';

export abstract class OrdersPageBase extends BaseComponent implements OnInit {
  orders: Order[];
  count: number;

  filter$ = this.ordersFacade.filter$;
  sorting$ = this.ordersFacade.sorting$;
  pagination$ = this.ordersFacade.pagination$;
  role$ = this.coreFacade.role$;

  constructor(
    private route: ActivatedRoute,
    protected ordersFacade: OrdersFacade,
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
