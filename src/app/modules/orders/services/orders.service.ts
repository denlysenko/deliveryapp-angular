import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ListResponse } from '@common/models';
import { ApiService } from '@core/services/api.service';

import { Order, OrdersFilter } from '../models';

@Injectable()
export class OrdersService {
  constructor(private apiService: ApiService) {}

  getOrdersSelf(query: OrdersFilter): Observable<ListResponse<Order>> {
    return this.apiService.get('/users/self/orders', query);
  }

  getOrder(id: number): Observable<Order> {
    return this.apiService.get(`/orders/${id}`);
  }

  getOrders(query: OrdersFilter): Observable<ListResponse<Order>> {
    return this.apiService.get('/orders', query);
  }

  createOrderSelf(order: Order): Observable<Order> {
    return this.apiService.post('/users/self/orders', order);
  }

  updateOrderSelf(id: number, order: Order): Observable<Order> {
    return this.apiService.patch(`/users/self/orders/${id}`, order);
  }

  createOrder(order: Order): Observable<Order> {
    return this.apiService.post('/orders', order);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.apiService.patch(`/orders/${id}`, order);
  }
}
