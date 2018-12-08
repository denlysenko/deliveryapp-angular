import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ACCESS_TOKEN } from '@common/constants';

import { StorageService } from '../../services/storage/storage.service';
import { UserSelfService } from '../../services/user-self/user-self.service';
import { Go } from '../actions/router.actions';
import { LoadSelfFail, LoadSelfSuccess, SelfActionTypes } from '../actions/self.actions';

// import * as orderFilterActions from '../../../pages/orders/store/actions/filter.actions';
// import * as paymentFilterActions from '../../../pages/payments/store/actions/filter.actions';
// import * as paymentActions from '../../../pages/payments/store/actions/payments.actions';
// import * as usersActions from '../../../pages/users/store/actions/users.actions';

// import { MessagesService } from '../../../lib/messages/messages.service';

@Injectable()
export class SelfEffects {
  constructor(
    private actions$: Actions,
    private userSelfService: UserSelfService,
    private storageService: StorageService // private messagesService: MessagesService
  ) {}

  @Effect()
  loadSelf$ = this.actions$.ofType(SelfActionTypes.LOAD_SELF).pipe(
    switchMap(() => {
      return this.userSelfService.loadSelf().pipe(
        map(response => new LoadSelfSuccess(response)),
        catchError(err => of(new LoadSelfFail(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  loadSelfSuccess$ = this.actions$
    .ofType(SelfActionTypes.LOAD_SELF_SUCCESS)
    .pipe(
      map((action: LoadSelfSuccess) => action.payload),
      tap(user => {
        // this.messagesService.join(this.storageService.getItem('lg_access_token'));
      })
    );

  @Effect()
  logout$ = this.actions$.ofType(SelfActionTypes.LOGOUT).pipe(
    tap(() => {
      // this.messagesService.leave(this.storageService.getItem('lg_access_token'));
      this.storageService.removeItem(ACCESS_TOKEN);
    }),
    mergeMap(() => [
      new Go({ path: ['login'] })
      // new orderFilterActions.ResetOrderFilter(),
      // new paymentFilterActions.ResetPaymentFilter(),
      // new paymentActions.ResetPaymentState(),
      // new usersActions.ResetUsersState() // emits before navigation ended and ngOnDestroy fired, could be some errors in console
    ])
  );
}
