import { Injectable } from '@angular/core';

import { ApiService } from '@core/services/api.service';

import { Observable } from 'rxjs';

import { CompanyAddress, CompanyBankDetails } from '../models';

@Injectable()
export class SettingsService {
  constructor(private readonly apiService: ApiService) {}

  getAddress(): Observable<CompanyAddress> {
    return this.apiService.get('/settings/address');
  }

  getBankDetails(): Observable<CompanyBankDetails> {
    return this.apiService.get('/settings/bank-details');
  }

  createAddress(address: CompanyAddress): Observable<CompanyAddress> {
    return this.apiService.post('/settings/address', address);
  }

  createBankDetails(
    bankDetails: CompanyBankDetails
  ): Observable<CompanyBankDetails> {
    return this.apiService.post('/settings/bank-details', bankDetails);
  }

  updateAddress(address: CompanyAddress): Observable<CompanyAddress> {
    const { id } = address;
    return this.apiService.patch(`/settings/address/${id}`, address);
  }

  updateBankDetails(
    bankDetails: CompanyBankDetails
  ): Observable<CompanyBankDetails> {
    const { id } = bankDetails;
    return this.apiService.patch(`/settings/bank-details/${id}`, bankDetails);
  }
}
