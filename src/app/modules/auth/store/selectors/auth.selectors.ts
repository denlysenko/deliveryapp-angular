import { createSelector } from '@ngrx/store';

import { getAuthState } from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const getAuthLoading = createSelector(
  getAuthState,
  fromAuth.getAuthLoading
);

export const getAuthError = createSelector(
  getAuthState,
  fromAuth.getAuthError
);
