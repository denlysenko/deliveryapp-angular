import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ListResponse } from '@common/models';

import { environment } from '~/environments/environment';

import { Log, LogsFilter } from '../models';
import { LogsService } from './logs.service';

describe('LogsService', () => {
  let service: LogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogsService]
    });

    service = TestBed.get(LogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLogs()', () => {
    it('should send GET request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: ListResponse<Log> = {
        rows: [
          {
            action: 1,
            userId: 1,
            createdAt: new Date().toString()
          }
        ],
        count: 1
      };

      service.getLogs().subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/logs`);

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));

    it('should build correct query string and send GET request', fakeAsync(() => {
      const http = TestBed.get(HttpTestingController);
      const payload: ListResponse<Log> = {
        rows: [
          {
            action: 1,
            userId: 1,
            createdAt: new Date().toString()
          }
        ],
        count: 1
      };

      const filter: Partial<LogsFilter> = {
        'filter[action]': 1,
        'order[createdAt]': 'asc'
      };

      const encodedQueryString = `${encodeURIComponent(
        'filter[action]'
      )}=1&${encodeURIComponent('order[createdAt]')}=asc`;

      service.getLogs(filter).subscribe(res => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(
        `${environment.apiUrl}/logs?${encodedQueryString}`
      );

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));
  });
});
