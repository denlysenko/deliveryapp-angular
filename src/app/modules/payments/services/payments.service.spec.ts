import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ListResponse } from '@common/models';

import { environment } from '~/environments/environment';

import { Payment, PaymentsFilter } from '../models';
import { PaymentsService } from './payments.service';

// tslint:disable-next-line:no-big-function
describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentsService]
    });

    service = TestBed.get(PaymentsService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getPaymentsSelf()', () => {
    it('should send GET request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: ListResponse<Payment> = {
        rows: [
          {
            total: 5000,
            status: false,
            dueDate: new Date()
          }
        ],
        count: 1
      };

      service.getPaymentsSelf().subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/users/self/payments`);

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));

    it('should send GET request with correct query string', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: ListResponse<Payment> = {
        rows: [
          {
            total: 5000,
            status: false,
            dueDate: new Date()
          }
        ],
        count: 1
      };

      const filter: PaymentsFilter = {
        'filter[id]': 1,
        'order[createdAt]': 'asc'
      };

      const encodedQueryString = `${encodeURIComponent(
        'filter[id]'
      )}=1&${encodeURIComponent('order[createdAt]')}=asc`;

      service.getPaymentsSelf(filter).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(
        `${environment.apiUrl}/users/self/payments?${encodedQueryString}`
      );

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));
  });

  describe('getPayments()', () => {
    it('should send GET request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: ListResponse<Payment> = {
        rows: [
          {
            total: 5000,
            status: false,
            dueDate: new Date()
          }
        ],
        count: 1
      };

      service.getPayments().subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/payments`);

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));

    it('should send GET request with correct query string', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: ListResponse<Payment> = {
        rows: [
          {
            total: 5000,
            status: false,
            dueDate: new Date()
          }
        ],
        count: 1
      };

      const filter: PaymentsFilter = {
        'filter[id]': 1,
        'order[createdAt]': 'asc'
      };

      const encodedQueryString = `${encodeURIComponent(
        'filter[id]'
      )}=1&${encodeURIComponent('order[createdAt]')}=asc`;

      service.getPayments(filter).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(
        `${environment.apiUrl}/payments?${encodedQueryString}`
      );

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));
  });

  describe('createPayment()', () => {
    it('should send POST request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      service.createPayment(payload).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/payments`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(payload);

      req.flush(payload);

      tick();
    }));

    it('should return error if creation failed', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const error = {
        message: 'ERR'
      };
      const payload: Payment = {
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      service.createPayment(payload).subscribe(
        () => {},
        err => {
          expect(err.status).toEqual(422);
          expect(err.error).toEqual(error);
        }
      );

      const req = http.expectOne(`${environment.apiUrl}/payments`);

      expect(req.request.method).toBe('POST');

      req.error(new HttpErrorResponse({ error: error, status: 422 }));

      tick();
    }));
  });

  describe('updatePayment()', () => {
    it('should send PATCH request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: Payment = {
        id: 1,
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      service.updatePayment(payload).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/payments/1`);

      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toBe(payload);

      req.flush(payload);

      tick();
    }));

    it('should return error if updating failed', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const error = {
        message: 'ERR'
      };
      const payload: Payment = {
        id: 1,
        total: 5000,
        status: false,
        dueDate: new Date()
      };

      service.updatePayment(payload).subscribe(
        () => {},
        err => {
          expect(err.status).toEqual(422);
          expect(err.error).toEqual(error);
        }
      );

      const req = http.expectOne(`${environment.apiUrl}/payments/1`);
      expect(req.request.method).toBe('PATCH');
      req.error(new HttpErrorResponse({ error: error, status: 422 }));

      tick();
    }));
  });
});
