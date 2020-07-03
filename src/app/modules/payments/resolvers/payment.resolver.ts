import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { Payment } from '../models';
import { PaymentsService } from '../services/payments.service';

@Injectable()
export class PaymentResolver implements Resolve<Payment> {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly coreFacade: CoreFacade
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Payment> {
    const id = parseInt(route.paramMap.get('id'), 10);

    return this.coreFacade.self$.pipe(
      switchMap(() => this.paymentsService.getPayment(id)),
      take(1)
    );
  }
}
