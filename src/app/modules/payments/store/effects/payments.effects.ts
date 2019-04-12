import { Injectable } from '@angular/core';

import { FeedbackService } from '@core/services';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { PaymentsService } from '../../services/payments.service';
import {
  CreatePayment,
  CreatePaymentFail,
  CreatePaymentSuccess,
  PaymentsActionTypes,
  UpdatePayment,
  UpdatePaymentFail,
  UpdatePaymentSuccess
} from '../actions';

const CREATE_SUCCESS_MESSAGE = 'Payment created';
const UPDATE_SUCCESS_MESSAGE = 'Payment updated';

@Injectable()
export class PaymentsEffects {
  constructor(
    private actions$: Actions,
    private paymentsService: PaymentsService,
    private feedbackService: FeedbackService
  ) {}

  @Effect()
  createPayment$ = this.actions$.pipe(
    ofType(PaymentsActionTypes.CREATE),
    map((action: CreatePayment) => action.payload),
    switchMap(payment => {
      return this.paymentsService.createPayment(payment).pipe(
        map(() => new CreatePaymentSuccess()),
        catchError(err => of(new CreatePaymentFail(err)))
      );
    })
  );

  @Effect()
  updatePayment$ = this.actions$.pipe(
    ofType(PaymentsActionTypes.UPDATE),
    map((action: UpdatePayment) => action.payload),
    switchMap(payment => {
      return this.paymentsService.updatePayment(payment.id, payment).pipe(
        map(() => new UpdatePaymentSuccess()),
        catchError(err => of(new UpdatePaymentFail(err)))
      );
    })
  );

  @Effect({ dispatch: false })
  handleCreateSuccess$ = this.actions$.pipe(
    ofType(PaymentsActionTypes.CREATE_SUCCESS),
    tap(() => this.feedbackService.success(CREATE_SUCCESS_MESSAGE))
  );

  @Effect({ dispatch: false })
  handleUpdateSuccess$ = this.actions$.pipe(
    ofType(PaymentsActionTypes.UPDATE_SUCCESS),
    tap(() => this.feedbackService.success(UPDATE_SUCCESS_MESSAGE))
  );
}
