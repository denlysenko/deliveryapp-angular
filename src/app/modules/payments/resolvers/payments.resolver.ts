import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Roles } from '@common/enums';
import { ListResponse } from '@common/models';

import { CoreFacade } from '@core/store';

import { User } from '@users/models';

import { Observable } from 'rxjs';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';

import { Payment, PaymentsFilter } from '../models';
import { PaymentsService } from '../services/payments.service';
import { PaymentsFacade } from '../store';

@Injectable()
export class PaymentsResolver implements Resolve<ListResponse<Payment>> {
  constructor(
    private paymentsService: PaymentsService,
    private paymentsFacade: PaymentsFacade,
    private coreFacade: CoreFacade
  ) {}

  resolve(): Observable<ListResponse<Payment>> {
    return this.coreFacade.self$.pipe(
      withLatestFrom(this.paymentsFacade.allFilters$),
      switchMap(([user, paymentsFilter]: [User, PaymentsFilter]) =>
        this.paymentsService[
          user.role === Roles.CLIENT ? 'getPaymentsSelf' : 'getPayments'
        ](paymentsFilter)
      ),
      take(1)
    );
  }
}
