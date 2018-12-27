import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSelf from '../reducers/self.reducer';

export const getSelf = createSelector(
  fromFeature.getSelfState,
  fromSelf.getSelf
);

export const getLoggedIn = createSelector(
  getSelf,
  user => !!user
);

export const getSelfRole = createSelector(
  getSelf,
  user => user && user.role
);

export const getSelfLoading = createSelector(
  fromFeature.getSelfState,
  fromSelf.getSelfLoading
);

export const getSelfError = createSelector(
  fromFeature.getSelfState,
  fromSelf.getSelfError
);
