import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

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

    this.coreFacade.loadSelf();
    this.coreFacade.loadMessages();
    return of(true);
  }
}
