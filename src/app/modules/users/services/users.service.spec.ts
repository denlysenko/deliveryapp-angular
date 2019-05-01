import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ListResponse } from '@common/models';

import { environment } from '~/environments/environment';

import { User, UsersFilter } from '../models';
import { UsersService } from './users.service';

describe('Users Service', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });

    service = TestBed.get(UsersService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers()', () => {
    it('should send GET request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: ListResponse<User> = {
        rows: [
          {
            email: 'test@test.com'
          }
        ],
        count: 1
      };

      service.getUsers().subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/users`);

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));

    it('should send GET request with correct query string', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: ListResponse<User> = {
        rows: [
          {
            email: 'test@test.com'
          }
        ],
        count: 1
      };

      const filter: Partial<UsersFilter> = {
        'filter[id]': 1,
        'order[firstName]': 'asc'
      };

      const encodedQueryString = `${encodeURIComponent(
        'filter[id]'
      )}=1&${encodeURIComponent('order[firstName]')}=asc`;

      service.getUsers(filter).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(
        `${environment.apiUrl}/users?${encodedQueryString}`
      );

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));
  });

  describe('getById()', () => {
    it('should send GET request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: User = {
        email: 'test@test.com'
      };

      service.getById(1).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/users/1`);

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));
  });

  describe('createUser()', () => {
    it('should send PSOT request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: User = {
        email: 'test@test.com'
      };

      service.createUser(payload).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/users`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);

      req.flush(payload);

      tick();
    }));

    it('should return error if creation failed', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const error = {
        message: 'ERR'
      };
      const payload: User = {
        email: 'test@test.com'
      };

      service.createUser(payload).subscribe(
        () => {},
        err => {
          expect(err.status).toEqual(422);
          expect(err.error).toEqual(error);
        }
      );

      const req = http.expectOne(`${environment.apiUrl}/users`);

      expect(req.request.method).toBe('POST');

      req.error(new HttpErrorResponse({ error: error, status: 422 }));

      tick();
    }));
  });

  describe('updateUser()', () => {
    it('should send PATCH request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: User = {
        id: 1,
        email: 'test@test.com'
      };

      service.updateUser(payload).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/users/1`);

      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(payload);

      req.flush(payload);

      tick();
    }));

    it('should return error if updating failed', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const error = {
        message: 'ERR'
      };
      const payload: User = {
        id: 1,
        email: 'test@test.com'
      };

      service.updateUser(payload).subscribe(
        () => {},
        err => {
          expect(err.status).toEqual(422);
          expect(err.error).toEqual(error);
        }
      );

      const req = http.expectOne(`${environment.apiUrl}/users/1`);

      expect(req.request.method).toBe('PATCH');

      req.error(new HttpErrorResponse({ error: error, status: 422 }));

      tick();
    }));
  });
});
