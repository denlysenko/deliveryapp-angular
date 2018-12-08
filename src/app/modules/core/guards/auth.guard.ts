import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CoreFacade } from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private coreFacade: CoreFacade) {}

  canActivate(): Observable<boolean> {
    return this.checkIfLoggedIn();
  }

  canLoad(): Observable<boolean> {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): Observable<boolean> {
    return this.coreFacade.loggedIn$.pipe(
      map(loggedIn => {
        if (!loggedIn) {
          this.coreFacade.navigate({
            path: ['login']
          });
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
