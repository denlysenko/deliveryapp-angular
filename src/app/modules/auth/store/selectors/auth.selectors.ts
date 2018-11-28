import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const getAuthState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthFeatureState) => state.auth
);

export const getAuthLoading = createSelector(
  getAuthState,
  fromAuth.getAuthLoading
);

export const getAuthError = createSelector(
  getAuthState,
  fromAuth.getAuthError
);
