import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthFacade } from '@auth/store/auth.facade';

import { CoreFacade } from '../store/core.facade';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authFacade: AuthFacade, private coreFacade: CoreFacade) {}

  canActivate(): Observable<boolean> {
    return this.checkIfLoggedIn();
  }

  canLoad(): Observable<boolean> {
    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): Observable<boolean> {
    return this.authFacade.loggedIn$.pipe(
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
