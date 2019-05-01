import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { CoreFacade } from '@core/store';

import { User } from '@users/models';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class ProfileResolver implements Resolve<User> {
  constructor(private coreFacade: CoreFacade) {}

  resolve(): Observable<User> {
    return this.coreFacade.self$.pipe(take(1));
  }
}
