import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const getAuthLoading = createSelector(
  fromFeature.getAuthState,
  fromAuth.getAuthLoading
);

export const getAuthError = createSelector(
  fromFeature.getAuthState,
  fromAuth.getAuthError
);
