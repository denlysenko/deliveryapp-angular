// tslint:disable:no-big-function
import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListResponse } from '@common/models';
import { ApiService } from '@core/services/api.service';
import { environment } from '~/environments/environment';

import { Order, OrdersFilter } from '../models';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OrdersService, ApiService]
    });
  });

  describe('getOrdersSelf()', () => {
    it('should send GET request', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: ListResponse<Order> = {
          rows: [
            {
              cityFrom: 'test',
              cityTo: 'test',
              addressFrom: 'test',
              addressTo: 'test',
              cargoName: 'test',
              cargoWeight: 1,
              senderEmail: 'test@test.com',
              senderPhone: '1232123'
            }
          ],
          count: 1
        };

        service.getOrdersSelf().subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(`${environment.apiUrl}/users/self/orders`);
        expect(req.request.method).toBe('GET');
        req.flush(payload);

        tick();
      })
    ));

    it('should send GET request with correct query string', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: ListResponse<Order> = {
          rows: [
            {
              cityFrom: 'test',
              cityTo: 'test',
              addressFrom: 'test',
              addressTo: 'test',
              cargoName: 'test',
              cargoWeight: 1,
              senderEmail: 'test@test.com',
              senderPhone: '1232123'
            }
          ],
          count: 1
        };

        const filter: OrdersFilter = {
          'filter[cargoName]': 'test',
          'order[cargoName]': 'asc'
        };

        const encodedQueryString = `${encodeURIComponent(
          'filter[cargoName]'
        )}=test&${encodeURIComponent('order[cargoName]')}=asc`;

        service.getOrdersSelf(filter).subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(
          `${environment.apiUrl}/users/self/orders?${encodedQueryString}`
        );

        expect(req.request.method).toBe('GET');
        req.flush(payload);

        tick();
      })
    ));
  });

  describe('getOrders()', () => {
    it('should send GET request', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: ListResponse<Order> = {
          rows: [
            {
              cityFrom: 'test',
              cityTo: 'test',
              addressFrom: 'test',
              addressTo: 'test',
              cargoName: 'test',
              cargoWeight: 1,
              senderEmail: 'test@test.com',
              senderPhone: '1232123'
            }
          ],
          count: 1
        };

        service.getOrders().subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(`${environment.apiUrl}/orders`);
        expect(req.request.method).toBe('GET');
        req.flush(payload);

        tick();
      })
    ));

    it('should send GET request with correct query string', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: ListResponse<Order> = {
          rows: [
            {
              cityFrom: 'test',
              cityTo: 'test',
              addressFrom: 'test',
              addressTo: 'test',
              cargoName: 'test',
              cargoWeight: 1,
              senderEmail: 'test@test.com',
              senderPhone: '1232123'
            }
          ],
          count: 1
        };

        const filter: OrdersFilter = {
          'filter[cargoName]': 'test',
          'order[cargoName]': 'asc'
        };

        const encodedQueryString = `${encodeURIComponent(
          'filter[cargoName]'
        )}=test&${encodeURIComponent('order[cargoName]')}=asc`;

        service.getOrders(filter).subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(
          `${environment.apiUrl}/orders?${encodedQueryString}`
        );

        expect(req.request.method).toBe('GET');
        req.flush(payload);

        tick();
      })
    ));
  });

  describe('getOrder', () => {
    it('should send GET request', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };
        const ORDER_ID = 1;

        service.getOrder(ORDER_ID).subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(`${environment.apiUrl}/orders/${ORDER_ID}`);
        expect(req.request.method).toBe('GET');
        req.flush(payload);

        tick();
      })
    ));
  });

  describe('createOrderSelf()', () => {
    it('should send POST request', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };

        service.createOrderSelf(payload).subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(`${environment.apiUrl}/users/self/orders`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(payload);
        req.flush(payload);

        tick();
      })
    ));

    it('should return error if creation failed', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const error = {
          message: 'ERR'
        };
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };

        service.createOrderSelf(payload).subscribe(
          () => {},
          err => {
            expect(err.status).toEqual(422);
            expect(err.error).toEqual(error);
          }
        );

        const req = http.expectOne(`${environment.apiUrl}/users/self/orders`);
        expect(req.request.method).toBe('POST');
        req.error(new HttpErrorResponse({ error: error, status: 422 }));

        tick();
      })
    ));
  });

  describe('createOrder()', () => {
    it('should send POST request', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };

        service.createOrder(payload).subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(`${environment.apiUrl}/orders`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toBe(payload);
        req.flush(payload);

        tick();
      })
    ));

    it('should return error if creation failed', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const error = {
          message: 'ERR'
        };
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };

        service.createOrder(payload).subscribe(
          () => {},
          err => {
            expect(err.status).toEqual(422);
            expect(err.error).toEqual(error);
          }
        );

        const req = http.expectOne(`${environment.apiUrl}/orders`);
        expect(req.request.method).toBe('POST');
        req.error(new HttpErrorResponse({ error: error, status: 422 }));

        tick();
      })
    ));
  });

  describe('updateOrderSelf()', () => {
    it('should send PATCH request', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };
        const ORDER_ID = 1;

        service.updateOrderSelf(ORDER_ID, payload).subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(
          `${environment.apiUrl}/users/self/orders/${ORDER_ID}`
        );
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toBe(payload);
        req.flush(payload);

        tick();
      })
    ));

    it('should return error if updating failed', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const error = {
          message: 'ERR'
        };
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };
        const ORDER_ID = 1;

        service.updateOrderSelf(ORDER_ID, payload).subscribe(
          () => {},
          err => {
            expect(err.status).toEqual(422);
            expect(err.error).toEqual(error);
          }
        );

        const req = http.expectOne(
          `${environment.apiUrl}/users/self/orders/${ORDER_ID}`
        );
        expect(req.request.method).toBe('PATCH');
        req.error(new HttpErrorResponse({ error: error, status: 422 }));

        tick();
      })
    ));
  });

  describe('updateOrder()', () => {
    it('should send PATCH request', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };
        const ORDER_ID = 1;

        service.updateOrder(ORDER_ID, payload).subscribe(res => {
          expect(res).toEqual(payload);
        });

        const req = http.expectOne(`${environment.apiUrl}/orders/1`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toBe(payload);
        req.flush(payload);

        tick();
      })
    ));

    it('should return error if updating failed', inject(
      [OrdersService],
      fakeAsync(service => {
        const http = TestBed.inject(HttpTestingController);
        const error = {
          message: 'ERR'
        };
        const payload: Order = {
          cityFrom: 'test',
          cityTo: 'test',
          addressFrom: 'test',
          addressTo: 'test',
          cargoName: 'test',
          cargoWeight: 1,
          senderEmail: 'test@test.com',
          senderPhone: '1232123'
        };
        const ORDER_ID = 1;

        service.updateOrder(ORDER_ID, payload).subscribe(
          () => {},
          err => {
            expect(err.status).toEqual(422);
            expect(err.error).toEqual(error);
          }
        );

        const req = http.expectOne(`${environment.apiUrl}/orders/${ORDER_ID}`);
        expect(req.request.method).toBe('PATCH');
        req.error(new HttpErrorResponse({ error: error, status: 422 }));

        tick();
      })
    ));
  });
});
