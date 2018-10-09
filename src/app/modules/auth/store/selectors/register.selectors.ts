import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRegister from '../reducers/register.reducer';

export const getRegisterState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.register
);

export const getRegisterLoading = createSelector(
  getRegisterState,
  fromRegister.getRegisterLoading
);

export const getRegisterError = createSelector(
  getRegisterState,
  fromRegister.getRegisterError
);
