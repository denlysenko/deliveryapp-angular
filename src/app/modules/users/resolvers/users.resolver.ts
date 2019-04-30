import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ListResponse } from '@common/models';

import { CoreFacade } from '@core/store';

import { Observable } from 'rxjs';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';

import { User, UsersFilter } from '../models';
import { UsersService } from '../services/users.service';
import { UsersFacade } from '../store';

@Injectable()
export class UsersResolver implements Resolve<ListResponse<User>> {
  constructor(
    private usersService: UsersService,
    private usersFacade: UsersFacade,
    private coreFacade: CoreFacade
  ) {}

  resolve(): Observable<ListResponse<User>> {
    return this.coreFacade.self$.pipe(
      withLatestFrom(this.usersFacade.allFilters$),
      switchMap(([_, usersFilter]: [never, UsersFilter]) =>
        this.usersService.getUsers(usersFilter)
      ),
      take(1)
    );
  }
}
