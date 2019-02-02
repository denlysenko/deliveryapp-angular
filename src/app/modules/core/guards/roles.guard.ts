import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route
} from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { CoreFacade } from '../store';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate, CanLoad {
  constructor(private coreFacade: CoreFacade) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkRole(next);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.checkRole(route);
  }

  private checkRole(
    route: Route | ActivatedRouteSnapshot
  ): Observable<boolean> {
    return this.coreFacade.self$.pipe(
      filter(user => !!user),
      map(user => {
        const role = route.data['role'];

        if (role !== user.role) {
          this.coreFacade.navigate({
            path: ['']
          });
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
