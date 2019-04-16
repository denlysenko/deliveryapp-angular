import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '@base/BaseComponent';

import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent,
  ValidationError
} from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  filter,
  skip,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { Payment, PaymentsFilter } from '../../models';
import { PaymentsService } from '../../services/payments.service';
import { PaymentsFacade } from '../../store';

const SUCCESS_MESSAGE = 'Payment saved!';

@Component({
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent extends BaseComponent implements OnInit {
  readonly roles = Roles;

  payments: Payment[];
  count: number;

  current$ = this.paymentsFacade.current$;
  filter$ = this.paymentsFacade.filter$;
  sorting$ = this.paymentsFacade.sorting$;
  pagination$ = this.paymentsFacade.pagination$;
  role$ = this.coreFacade.role$;

  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<ValidationError | null>(null);

  constructor(
    private route: ActivatedRoute,
    private paymentsFacade: PaymentsFacade,
    private coreFacade: CoreFacade,
    private paymentsService: PaymentsService,
    private loaderService: LoaderService,
    private feedbackService: FeedbackService
  ) {
    super();
  }

  ngOnInit() {
    this.count = this.route.snapshot.data.payments.count;
    this.payments = this.route.snapshot.data.payments.rows;
    this.subscribeToFiltersChanges();
  }

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  get error$(): Observable<ValidationError | null> {
    return this.error.asObservable();
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

  selectPayment(payment: Payment) {
    this.paymentsFacade.select(payment);
  }

  save(payment: Payment) {
    const { id } = payment;

    this.loading.next(true);

    this.paymentsService[id ? 'updatePayment' : 'createPayment'](payment)
      .pipe(
        tap(() => {
          this.loading.next(false);
        }),
        withLatestFrom(this.role$),
        withLatestFrom(this.paymentsFacade.allFilters$),
        switchMap(([_, role], paymentsFilter) =>
          this.fetchPayments(role, paymentsFilter)
        )
      )
      .subscribe(
        () => {
          this.feedbackService.success(SUCCESS_MESSAGE);
        },
        err => {
          this.loading.next(false);
          this.error.next(err);
        }
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

  private fetchPayments(paymentsFilter: PaymentsFilter, role: number) {
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
}
