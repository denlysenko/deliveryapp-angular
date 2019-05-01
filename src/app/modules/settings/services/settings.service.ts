import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';

import { Observable } from 'rxjs';

import { CompanyAddress, CompanyBankDetails } from '../models';

@Injectable()
export class SettingsService {
  constructor(private apiService: ApiService) {}

  getAddress(): Observable<CompanyAddress> {
    return this.apiService.get('/settings/address');
  }

  getBankDetails(): Observable<CompanyBankDetails> {
    return this.apiService.get('/settings/bankDetails');
  }

  createAddress(address: CompanyAddress): Observable<CompanyAddress> {
    return this.apiService.post('/settings/address', address);
  }

  createBankDetails(
    bankDetails: CompanyBankDetails
  ): Observable<CompanyBankDetails> {
    return this.apiService.post('/settings/bankDetails', bankDetails);
  }

  updateAddress(
    id: number,
    address: CompanyAddress
  ): Observable<CompanyAddress> {
    return this.apiService.patch(`/settings/address/${id}`, address);
  }

  updateBankDetails(
    id: number,
    bankDetails: CompanyBankDetails
  ): Observable<CompanyBankDetails> {
    return this.apiService.patch(`/settings/bankDetails/${id}`, bankDetails);
  }
}
