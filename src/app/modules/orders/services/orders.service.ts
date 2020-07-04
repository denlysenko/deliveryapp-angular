import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ListResponse } from '@common/models';
import { ApiService } from '@core/services/api.service';

import { Order, OrdersFilter } from '../models';

@Injectable()
export class OrdersService {
  constructor(private readonly apiService: ApiService) {}

  getOrder(id: number): Observable<Order> {
    return this.apiService.get(`/orders/${id}`);
  }

  getOrders(query: Partial<OrdersFilter>): Observable<ListResponse<Order>> {
    return this.apiService.get('/orders', query);
  }

  createOrder(order: Order): Observable<Order> {
    return this.apiService.post('/orders', order);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.apiService.patch(`/orders/${id}`, order);
  }
}
