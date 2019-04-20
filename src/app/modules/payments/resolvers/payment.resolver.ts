import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';

import { Payment } from '../models';
import { PaymentsService } from '../services/payments.service';

@Injectable()
export class PaymentResolver implements Resolve<Payment> {
  constructor(private paymentsService: PaymentsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Payment> {
    const id = parseInt(route.paramMap.get('id'), 10);

    return this.paymentsService.getPayment(id);
  }
}
