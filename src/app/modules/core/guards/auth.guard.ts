import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { ACCESS_TOKEN, USER_LOADED_KEY } from '@common/constants';

import { AppStorageService, StorageService } from '@core/services';

import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

import { CoreFacade } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private coreFacade: CoreFacade,
    private storageService: StorageService,
    private appStorageService: AppStorageService
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkIfLoggedIn();
  }

  canLoad(): Observable<boolean> {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): Observable<boolean> {
    return this.checkStore().pipe(
      mergeMap(loggedIn => {
        if (loggedIn) {
          return of(true);
        }

        return this.checkStorage();
      }),
      map(loggedIn => {
        if (!loggedIn) {
          this.coreFacade.navigate({
            path: ['auth'],
            extras: {
              clearHistory: true,
              transition: {
                name: 'flip',
                duration: 300,
                curve: 'linear'
              }
            }
          });

          return false;
        }

        return true;
      })
    );
  }

  private checkStore(): Observable<boolean> {
    return this.coreFacade.loggedIn$.pipe(take(1));
  }

  private checkStorage(): Observable<boolean> {
    if (!this.storageService.getItem(ACCESS_TOKEN)) {
      return of(false);
    }

    if (!this.appStorageService.getItem(USER_LOADED_KEY)) {
      this.coreFacade.loadSelf();
      this.coreFacade.loadMessages();
      this.appStorageService.setItem(USER_LOADED_KEY, true);
    }

    return of(true);
  }
}
