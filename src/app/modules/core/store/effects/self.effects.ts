import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ACCESS_TOKEN } from '@common/constants';

import { StorageService } from '../../services/storage/storage.service';
import { UserSelfService } from '../../services/user-self/user-self.service';
import { Go } from '../actions/router.actions';
import {
  LoadSelfFail,
  LoadSelfSuccess,
  Logout,
  SelfActionTypes
} from '../actions/self.actions';

// tslint:disable-next-line:no-commented-code
// import { MessagesService } from '../../../lib/messages/messages.service';

@Injectable()
export class SelfEffects {
  constructor(
    private actions$: Actions,
    private userSelfService: UserSelfService,
    private storageService: StorageService // private messagesService: MessagesService
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

  @Effect({ dispatch: false })
  loadSelfSuccess$ = this.actions$.pipe(
    ofType(SelfActionTypes.LOAD_SELF_SUCCESS),
    map((action: LoadSelfSuccess) => action.payload),
    tap(user => {
      // tslint:disable-next-line:no-commented-code
      // this.messagesService.join(this.storageService.getItem('lg_access_token'));
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
    tap(() => {
      // tslint:disable-next-line:no-commented-code
      // this.messagesService.leave(this.storageService.getItem('lg_access_token'));
      this.storageService.removeItem(ACCESS_TOKEN);
    }),
    mergeMap(() => [
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
    ])
  );
}
