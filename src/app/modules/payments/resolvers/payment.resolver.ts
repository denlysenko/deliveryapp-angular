import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Roles } from '@common/enums';

import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Payment } from '../models';
import { PaymentsService } from '../services/payments.service';

@Injectable()
export class PaymentResolver implements Resolve<Payment> {
  constructor(
    private paymentsService: PaymentsService,
    private coreFacade: CoreFacade
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Payment> {
    const id = parseInt(route.paramMap.get('id'), 10);

    return this.coreFacade.self$.pipe(
      switchMap(user =>
        user.role === Roles.CLIENT
          ? this.paymentsService.getPaymentsSelf({ 'filter[id]': id })
          : this.paymentsService.getPayment(id)
      ),
      map(res => (res['rows'] ? res['rows'][0] : res)),
      take(1)
    );
  }
}
