import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ListResponse } from '@common/models';

import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';

import { Payment, PaymentsFilter } from '../models';
import { PaymentsService } from '../services/payments.service';
import { PaymentsFacade } from '../store';

@Injectable()
export class PaymentsResolver implements Resolve<ListResponse<Payment>> {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly paymentsFacade: PaymentsFacade,
    private readonly coreFacade: CoreFacade
  ) {}

  resolve(): Observable<ListResponse<Payment>> {
    return this.coreFacade.self$.pipe(
      withLatestFrom(this.paymentsFacade.allFilters$),
      switchMap(([_, paymentsFilter]: [never, PaymentsFilter]) =>
        this.paymentsService.getPayments(paymentsFilter)
      ),
      take(1)
    );
  }
}
