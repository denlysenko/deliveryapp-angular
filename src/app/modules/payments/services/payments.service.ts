import { Injectable } from '@angular/core';

import { ListResponse } from '@common/models';

import { ApiService } from '@core/services/api.service';

import { Observable } from 'rxjs';

import { Payment } from '../models';

@Injectable()
export class PaymentsService {
  constructor(private apiService: ApiService) {}

  getPaymentsSelf(query?: any): Observable<ListResponse<Payment>> {
    return this.apiService.get('/users/self/payments', query);
  }

  getPayments(query?: any): Observable<ListResponse<Payment>> {
    return this.apiService.get('/payments', query);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.apiService.post('/payments', payment);
  }

  updatePayment(payment: Payment): Observable<Payment> {
    const { id } = payment;
    return this.apiService.patch(`/payments/${id}`, payment);
  }
}
