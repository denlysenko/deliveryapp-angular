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
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { Payment, PaymentsFilter } from '../models';
import { PaymentsService } from '../services/payments.service';
import { PaymentsFacade } from '../store';

export abstract class PaymentsPageBase extends BaseComponent implements OnInit {
  readonly roles = Roles;

  payments: Payment[];
  count: number;

  filter$ = this.paymentsFacade.filter$;
  sorting$ = this.paymentsFacade.sorting$;
  pagination$ = this.paymentsFacade.pagination$;
  role$ = this.coreFacade.role$;

  constructor(
    private route: ActivatedRoute,
    protected paymentsFacade: PaymentsFacade,
    private coreFacade: CoreFacade,
    protected paymentsService: PaymentsService,
    private loaderService: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.count = this.route.snapshot.data.payments.count;
    this.payments = this.route.snapshot.data.payments.rows;
    this.subscribeToFiltersChanges();
  }

  handleFilterChange(event: FilterChangeEvent) {
    this.paymentsFacade.doFiltering(event);
  }

  handleSortingChange(event: SortingChangeEvent) {
    this.paymentsFacade.sort(event);
  }

  handlePageChange(event: PageChangeEvent) {
    this.paymentsFacade.paginate(event);
  }

  protected fetchPayments(paymentsFilter: PaymentsFilter, role: number) {
    this.loaderService.start();
    return this.paymentsService[
      role === Roles.CLIENT ? 'getPaymentsSelf' : 'getPayments'
    ](paymentsFilter).pipe(
      tap(({ count, rows }) => {
        this.loaderService.stop();
        this.payments = rows;
        this.count = count;
      }),
      catchError(() => {
        this.loaderService.stop();
        return EMPTY;
      })
    );
  }

  private subscribeToFiltersChanges() {
    this.paymentsFacade.allFilters$
      .pipe(
        skip(1),
        withLatestFrom(this.role$),
        filter(([_, role]: [never, number]) => role !== null),
        switchMap(([paymentsFilter, role]: [PaymentsFilter, number]) =>
          this.fetchPayments(paymentsFilter, role)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
