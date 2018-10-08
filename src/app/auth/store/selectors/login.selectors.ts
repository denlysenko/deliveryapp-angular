import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

export const getLoginState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.login
);

export const getLoginLoading = createSelector(
  getLoginState,
  fromLogin.getLoginLoading
);

export const getLoginError = createSelector(
  getLoginState,
  fromLogin.getLoginError
);
