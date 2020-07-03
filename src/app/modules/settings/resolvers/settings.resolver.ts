import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { forkJoin, Observable } from 'rxjs';

import { CompanyAddress, CompanyBankDetails } from '../models';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class SettingsResolver
  implements Resolve<Observable<[CompanyAddress, CompanyBankDetails]>> {
  constructor(private readonly settingsService: SettingsService) {}

  resolve(): Observable<[CompanyAddress, CompanyBankDetails]> {
    return forkJoin([
      this.settingsService.getAddress(),
      this.settingsService.getBankDetails()
    ]);
  }
}
