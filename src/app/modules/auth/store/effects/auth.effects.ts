import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ACCESS_TOKEN } from '@common/constants';
import { StorageService } from '@core/services';
import { Go } from '@core/store';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  AuthFail,
  AuthSuccess,
  Login,
  Register
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap(payload => {
      return this.authService.login(payload).pipe(
        tap(response =>
          this.storageService.setItem(ACCESS_TOKEN, response.token)
        ),
        map(() => new AuthSuccess()),
        catchError(err => of(new AuthFail(err)))
      );
    })
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: Register) => action.payload),
    switchMap(payload => {
      return this.authService.register(payload).pipe(
        tap(response =>
          this.storageService.setItem(ACCESS_TOKEN, response.token)
        ),
        map(() => new AuthSuccess()),
        catchError(err => of(new AuthFail(err)))
      );
    })
  );

  @Effect()
  authSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH_SUCCESS),
    map(
      () =>
        new Go({
          path: [''],
          extras: {
            clearHistory: true,
            transition: {
              name: 'flip',
              duration: 300,
              curve: 'linear'
            }
          }
        })
    )
  );
}
