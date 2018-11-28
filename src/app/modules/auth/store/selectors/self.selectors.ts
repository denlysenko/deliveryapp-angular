import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSelf from '../reducers/self.reducer';

export const getSelfState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthFeatureState) => state.self
);

export const getLoggedIn = createSelector(
  getSelfState,
  fromSelf.getLoggedIn
);

export const getSelf = createSelector(
  getSelfState,
  fromSelf.getSelf
);

export const getSelfRole = createSelector(
  getSelf,
  user => user && user.role
);

export const getSelfLoading = createSelector(
  getSelfState,
  fromSelf.getSelfLoading
);

export const getSelfError = createSelector(
  getSelfState,
  fromSelf.getSelfError
);
