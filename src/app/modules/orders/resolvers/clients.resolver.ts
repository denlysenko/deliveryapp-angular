import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { User } from '@auth/models';
import { Roles } from '@common/enums';
import { CoreFacade } from '@core/store';
import { UsersService } from '@users/services/users.service';

import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

const limit = 100;

@Injectable()
export class ClientsResolver implements Resolve<User | null> {
  constructor(
    private usersService: UsersService,
    private coreFacade: CoreFacade
  ) {}

  resolve(): Observable<User | null> {
    return this.coreFacade.self$.pipe(
      switchMap(user => {
        if (user.role !== Roles.CLIENT) {
          return this.usersService
            .getUsers({ 'filter[role]': Roles.CLIENT, limit })
            .pipe(map(res => res.rows));
        } else {
          return of(null);
        }
      }),
      take(1)
    );
  }
}
