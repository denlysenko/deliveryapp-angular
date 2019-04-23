import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ValidationError } from '@common/models';

import { FeedbackService, LoaderService } from '@core/services';
import { CoreFacade } from '@core/store';

import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { PaymentsPageBase } from '../../base/PaymentsPageBase';
import { Payment } from '../../models';
import { PaymentsService } from '../../services/payments.service';
import { PaymentsFacade } from '../../store';

const SUCCESS_MESSAGE = 'Payment saved!';

@Component({
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})
export class PaymentsPageComponent extends PaymentsPageBase {
  current$ = this.paymentsFacade.current$;

  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<ValidationError | null>(null);

  constructor(
    route: ActivatedRoute,
    paymentsFacade: PaymentsFacade,
    coreFacade: CoreFacade,
    paymentsService: PaymentsService,
    loaderService: LoaderService,
    private feedbackService: FeedbackService
  ) {
    super(route, paymentsFacade, coreFacade, paymentsService, loaderService);
  }

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  get error$(): Observable<ValidationError | null> {
    return this.error.asObservable();
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
}
