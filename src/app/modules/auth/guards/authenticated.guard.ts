import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { ACCESS_TOKEN } from '@common/constants';
import { StorageService } from '@core/services';
import { CoreFacade } from '@core/store';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private coreFacade: CoreFacade,
    private storageService: StorageService
  ) {}

  canActivate(): boolean {
    if (this.storageService.getItem(ACCESS_TOKEN)) {
      this.coreFacade.navigate({
        path: [''],
        extras: {
          clearHistory: true
        }
      });

      return false;
    }

    return true;
  }
}
