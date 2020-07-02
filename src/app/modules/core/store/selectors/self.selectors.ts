import { createSelector } from '@ngrx/store';

import { getSelfState } from '../reducers';
import * as fromSelf from '../reducers/self.reducer';

export const getSelf = createSelector(getSelfState, fromSelf.getSelf);

export const getLoggedIn = createSelector(getSelf, (user) => !!user);

export const getSelfRole = createSelector(getSelf, (user) => user && user.role);

export const getSelfLoading = createSelector(
  getSelfState,
  fromSelf.getSelfLoading
);

export const getSelfError = createSelector(getSelfState, fromSelf.getSelfError);
