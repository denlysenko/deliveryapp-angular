import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { ACCESS_TOKEN } from '@common/constants';

import { StorageService } from '../services/storage/storage.service';
import { CoreFacade } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private coreFacade: CoreFacade,
    private storageService: StorageService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.checkIfLoggedIn();
  }

  canLoad(): Observable<boolean> | boolean {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): Observable<boolean> | boolean {
    const loggedIn = this.storageService.getItem(ACCESS_TOKEN);

    if (!loggedIn) {
      this.coreFacade.navigate({
        path: ['auth']
      });

      return false;
    }

    return this.waitForUser();
  }

  private waitForUser(): Observable<boolean> {
    return this.coreFacade.loggedIn$.pipe(
      filter(loggedIn => !!loggedIn),
      take(1)
    );
  }
}
