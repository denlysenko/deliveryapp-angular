import { Injectable } from '@angular/core';

import { FeedbackService } from '@core/services';
import { LoadSelfSuccess } from '@core/store';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ProfileService } from '../../services/profile.service';
import {
  ProfileActionTypes,
  UpdatePassword,
  UpdatePasswordFail,
  UpdatePasswordSuccess,
  UpdateProfile,
  UpdateProfileFail,
  UpdateProfileSuccess
} from '../actions';

const PROFILE_UPDATED_MESSAGE = 'Profile updated';
const PASSWORD_UPDATED_MESSAGE = 'Password updated';

@Injectable()
export class ProfileEffects {
  constructor(
    private profileService: ProfileService,
    private actions$: Actions,
    private feedbackService: FeedbackService
  ) {}

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(ProfileActionTypes.UPDATE_PROFILE),
    map((action: UpdateProfile) => action.payload),
    switchMap(profile =>
      this.profileService.updateProfile(profile).pipe(
        map(user => new UpdateProfileSuccess(user)),
        catchError(err => of(new UpdateProfileFail(err)))
      )
    )
  );

  @Effect()
  updatePassword$ = this.actions$.pipe(
    ofType(ProfileActionTypes.UPDATE_PASSWORD),
    map((action: UpdatePassword) => action.payload),
    switchMap(passwordPayload =>
      this.profileService.updatePassword(passwordPayload).pipe(
        map(() => new UpdatePasswordSuccess()),
        catchError(err => of(new UpdatePasswordFail(err)))
      )
    )
  );

  @Effect()
  updateProfileSuccess$ = this.actions$.pipe(
    ofType(ProfileActionTypes.UPDATE_PROFILE_SUCCESS),
    map((action: UpdateProfileSuccess) => action.payload),
    tap(() => {
      this.feedbackService.success(PROFILE_UPDATED_MESSAGE);
    }),
    map(user => new LoadSelfSuccess(user))
  );

  @Effect({ dispatch: false })
  updatePasswordSuccess$ = this.actions$.pipe(
    ofType(ProfileActionTypes.UPDATE_PASSWORD_SUCCESS),
    tap(() => this.feedbackService.success(PASSWORD_UPDATED_MESSAGE))
  );
}
