import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ACCESS_TOKEN } from '@common/constants.ts';
import { CoreFacade } from '@core/store/core.facade';

import { AuthService } from '../../services/auth.service';
import * as loginActions from '../actions/login.actions';
import * as messagesActions from '../actions/messages.actions';
import * as selfActions from '../actions/self.actions';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private coreFacade: CoreFacade
  ) {}

  @Effect()
  login$ = this.actions$.ofType(loginActions.LOGIN).pipe(
    map((action: loginActions.Login) => action.payload),
    switchMap(payload => {
      return this.authService.login(payload).pipe(
        tap(response => localStorage.setItem(ACCESS_TOKEN, response.token)),
        map(() => new loginActions.LoginSuccess()),
        catchError(err => of(new loginActions.LoginFail(err)))
      );
    })
  );

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(loginActions.LOGIN_SUCCESS)
    .pipe(
      mergeMap(() => [
        new selfActions.LoadSelf(),
        new messagesActions.LoadMessages(),
        this.coreFacade.navigate({ path: [''] })
      ])
    );
}
