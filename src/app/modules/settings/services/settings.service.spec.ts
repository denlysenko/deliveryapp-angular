import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { environment } from '~/environments/environment';

import { CompanyAddress, CompanyBankDetails } from '../models';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsService]
    });

    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAddress()', () => {
    it('should send GET request', fakeAsync(() => {
      const http = TestBed.inject(HttpTestingController);
      const payload: CompanyAddress = {
        country: 'Country',
        city: 'City',
        street: 'Street',
        house: 'House'
      };

      service.getAddress().subscribe((res) => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/settings/address`);

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));
  });

  describe('getBankDetails()', () => {
    it('should send GET request', fakeAsync(() => {
      const http = TestBed.inject(HttpTestingController);
      const payload: CompanyBankDetails = {
        name: 'Name',
        accountNumber: 'Account Number',
        bin: 'bin',
        swift: 'swift'
      };

      service.getBankDetails().subscribe((res) => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/settings/bank-details`);

      expect(req.request.method).toBe('GET');

      req.flush(payload);

      tick();
    }));
  });

  describe('createAddress()', () => {
    it('should send POST request', fakeAsync(() => {
      const http = TestBed.inject(HttpTestingController);
      const payload: CompanyAddress = {
        country: 'Country',
        city: 'City',
        street: 'Street',
        house: 'House'
      };

      service.createAddress(payload).subscribe((res) => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/settings/address`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);

      req.flush(payload);

      tick();
    }));
  });

  describe('updateAddress()', () => {
    it('should send PATCH request', fakeAsync(() => {
      const http = TestBed.inject(HttpTestingController);
      const payload: CompanyAddress = {
        id: 1,
        country: 'Country',
        city: 'City',
        street: 'Street',
        house: 'House'
      };

      service.updateAddress(payload).subscribe((res) => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/settings/address/1`);

      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(payload);

      req.flush(payload);

      tick();
    }));
  });

  describe('createBankDetail()', () => {
    it('should send POST request', fakeAsync(() => {
      const http = TestBed.inject(HttpTestingController);
      const payload: CompanyBankDetails = {
        name: 'Name',
        accountNumber: 'Account Number',
        bin: 'bin',
        swift: 'swift'
      };

      service.createBankDetails(payload).subscribe((res) => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(`${environment.apiUrl}/settings/bank-details`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);

      req.flush(payload);

      tick();
    }));
  });

  describe('updateBankDetails()', () => {
    it('should send PATCH request', fakeAsync(() => {
      const http = TestBed.inject(HttpTestingController);
      const payload: CompanyBankDetails = {
        id: 1,
        name: 'Name',
        accountNumber: 'Account Number',
        bin: 'bin',
        swift: 'swift'
      };

      service.updateBankDetails(payload).subscribe((res) => {
        expect(res).toEqual(payload);
      });

      const req = http.expectOne(
        `${environment.apiUrl}/settings/bank-details/1`
      );

      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(payload);

      req.flush(payload);

      tick();
    }));
  });
});
