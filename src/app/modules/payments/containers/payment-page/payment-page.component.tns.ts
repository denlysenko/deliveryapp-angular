import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ValidationError } from '@common/models';

import { CoreFacade } from '@core/store';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Payment } from '../../models';
import { PaymentsService } from '../../services/payments.service';

const SUCCESS_REDIRECT_PATH = '/payments';

@Component({
  templateUrl: './payment-page.component.tns.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {
  payment$ = this.route.data.pipe(map(data => data.payment));
  role$ = this.coreFacade.role$;

  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<ValidationError | null>(null);

  constructor(
    private route: ActivatedRoute,
    private coreFacade: CoreFacade,
    private paymentsService: PaymentsService
  ) {}

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  get error$(): Observable<ValidationError | null> {
    return this.error.asObservable();
  }

  save(payment: Payment) {
    const { id } = payment;

    this.loading.next(true);

    this.paymentsService[id ? 'updatePayment' : 'createPayment'](
      payment
    ).subscribe(
      () => {
        this.loading.next(false);
        this.coreFacade.navigate({ path: [SUCCESS_REDIRECT_PATH] });
      },
      err => {
        this.loading.next(false);
        this.error.next(err);
      }
    );
  }
}
