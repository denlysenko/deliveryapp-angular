import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ACCESS_TOKEN } from '@common/constants';
import { CoreFacade } from '@core/store/core.facade';

import { AuthService } from '../../services/auth.service';
import * as messagesActions from '../actions/messages.actions';
import * as registerActions from '../actions/registration.actions';
import * as selfActions from '../actions/self.actions';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private coreFacade: CoreFacade
  ) {}

  @Effect()
  register$ = this.actions$.ofType(registerActions.REGISTER).pipe(
    map((action: registerActions.Register) => action.payload),
    switchMap(payload => {
      return this.authService.register(payload).pipe(
        tap(response => localStorage.setItem(ACCESS_TOKEN, response.token)),
        map(() => new registerActions.RegisterSuccess()),
        catchError(err => of(new registerActions.RegisterFail(err)))
      );
    })
  );

  @Effect()
  registerSuccess$ = this.actions$
    .ofType(registerActions.REGISTER_SUCCESS)
    .pipe(
      mergeMap(() => [
        this.coreFacade.navigate({ path: [''] }),
        new selfActions.LoadSelf(),
        new messagesActions.LoadMessages()
      ])
    );
}
