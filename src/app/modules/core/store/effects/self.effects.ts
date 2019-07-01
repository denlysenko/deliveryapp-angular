import { Injectable } from '@angular/core';

import { ACCESS_TOKEN, USER_LOADED_KEY } from '@common/constants';

import { MessagesService } from '@messages/services';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { from, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import {
  AppStorageService,
  LoaderService,
  StorageService,
  UserSelfService
} from '../../services';
import { Go } from '../actions/router.actions';
import {
  LoadSelfFail,
  LoadSelfSuccess,
  Logout,
  SelfActionTypes
} from '../actions/self.actions';

@Injectable()
export class SelfEffects {
  constructor(
    private actions$: Actions,
    private userSelfService: UserSelfService,
    private storageService: StorageService,
    private appStorageService: AppStorageService,
    private messagesService: MessagesService,
    private loaderService: LoaderService
  ) {}

  @Effect()
  loadSelf$ = this.actions$.pipe(
    ofType(SelfActionTypes.LOAD_SELF),
    switchMap(() => {
      return this.userSelfService.loadSelf().pipe(
        map(response => new LoadSelfSuccess(response)),
        catchError(err => of(new LoadSelfFail(err)))
      );
    })
  );

  @Effect()
  loadSelfFail$ = this.actions$.pipe(
    ofType(SelfActionTypes.LOAD_SELF_FAIL),
    map(() => new Logout())
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(SelfActionTypes.LOGOUT),
    switchMap(() => {
      this.loaderService.start();
      return from(this.messagesService.unsubscribeFromMessaging()).pipe(
        tap(() => {
          this.loaderService.stop();
          this.storageService.removeItem(ACCESS_TOKEN);
          this.appStorageService.removeItem(USER_LOADED_KEY);
        }),
        map(
          () =>
            new Go({
              path: ['auth'],
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
    })
  );
}
