import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ACCESS_TOKEN } from '@common/constants';
import { CoreFacade } from '@core/store/core.facade';

import { AuthService } from '../../services/auth.service';
import * as selfActions from '../actions/self.actions';

// import * as orderFilterActions from '../../../pages/orders/store/actions/filter.actions';
// import * as paymentFilterActions from '../../../pages/payments/store/actions/filter.actions';
// import * as paymentActions from '../../../pages/payments/store/actions/payments.actions';
// import * as usersActions from '../../../pages/users/store/actions/users.actions';

// import { MessagesService } from '../../../lib/messages/messages.service';

@Injectable()
export class SelfEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private coreFacade: CoreFacade // private messagesService: MessagesService
  ) {}

  @Effect()
  loadSelf$ = this.actions$.ofType(selfActions.LOAD_SELF).pipe(
    switchMap(() => {
      return this.authService.loadLoggedUser().pipe(
        map(response => new selfActions.LoadSelfSuccess(response)),
        catchError(err => of(new selfActions.LoadSelfFail(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  loadSelfSuccess$ = this.actions$.ofType(selfActions.LOAD_SELF_SUCCESS).pipe(
    map((action: selfActions.LoadSelfSuccess) => action.payload),
    tap(user => {
      // this.messagesService.join(localStorage.getItem('lg_access_token'));
    })
  );

  @Effect()
  logout$ = this.actions$.ofType(selfActions.LOGOUT).pipe(
    tap(() => {
      // this.messagesService.leave(localStorage.getItem('lg_access_token'));
      localStorage.removeItem(ACCESS_TOKEN);
    }),
    mergeMap(() => [
      this.coreFacade.navigate({ path: ['login'] })
      // new orderFilterActions.ResetOrderFilter(),
      // new paymentFilterActions.ResetPaymentFilter(),
      // new paymentActions.ResetPaymentState(),
      // new usersActions.ResetUsersState() // emits before navigation ended and ngOnDestroy fired, could be some errors in console
    ])
  );
}
