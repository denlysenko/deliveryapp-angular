import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  FilterChangeEvent,
  ListResponse,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { EMPTY, merge, Observable } from 'rxjs';
import { catchError, finalize, map, skip, switchMap } from 'rxjs/operators';

import { Order } from '../models';
import { OrdersService } from '../services/orders.service';
import { OrdersFacade } from '../store';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class OrdersPageBase {
  data$: Observable<ListResponse<Order>> = merge(
    this.route.data.pipe(
      map((data: { orders: ListResponse<Order> }) => data.orders)
    ),
    this.ordersFacade.allFilters$.pipe(
      skip(1),
      switchMap((ordersFilter) => {
        this.loaderService.start();
        return this.ordersService.getOrders(ordersFilter).pipe(
          catchError(() => EMPTY),
          finalize(() => this.loaderService.stop())
        );
      })
    )
  );

  filter$ = this.ordersFacade.filter$;
  sorting$ = this.ordersFacade.sorting$;
  pagination$ = this.ordersFacade.pagination$;
  role$ = this.coreFacade.role$;

  constructor(
    private readonly route: ActivatedRoute,
    protected readonly ordersFacade: OrdersFacade,
    private readonly coreFacade: CoreFacade,
    private readonly ordersService: OrdersService,
    private readonly loaderService: LoaderService
  ) {}

  handleFilterChange(event: FilterChangeEvent) {
    this.ordersFacade.doFiltering(event);
  }

  handleSortingChange(event: SortingChangeEvent) {
    this.ordersFacade.sort(event);
  }

  handlePageChange(event: PageChangeEvent) {
    this.ordersFacade.paginate(event);
  }
}
