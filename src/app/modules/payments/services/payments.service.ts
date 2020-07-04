import { Injectable } from '@angular/core';

import { ListResponse } from '@common/models';

import { ApiService } from '@core/services/api.service';

import { Observable } from 'rxjs';

import { Payment, PaymentsFilter } from '../models';

@Injectable()
export class PaymentsService {
  constructor(private readonly apiService: ApiService) {}

  getPayments(query?: PaymentsFilter): Observable<ListResponse<Payment>> {
    return this.apiService.get('/payments', query);
  }

  getPayment(id: number): Observable<Payment> {
    return this.apiService.get(`/payments/${id}`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.apiService.post('/payments', payment);
  }

  updatePayment(payment: Payment): Observable<Payment> {
    const { id } = payment;
    return this.apiService.patch(`/payments/${id}`, payment);
  }
}
