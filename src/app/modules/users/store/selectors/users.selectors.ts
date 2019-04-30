import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUsers from '../reducers/users.reducer';

export const getCurrent = createSelector(
  fromFeature.getUsersState,
  fromUsers.getCurrent
);

export const getFilter = createSelector(
  fromFeature.getUsersState,
  fromUsers.getFilter
);

export const getSorting = createSelector(
  fromFeature.getUsersState,
  fromUsers.getSorting
);

export const getPagination = createSelector(
  fromFeature.getUsersState,
  fromUsers.getPagination
);

export const getAllFilters = createSelector(
  getFilter,
  getSorting,
  getPagination,
  (filter, sorting, pagination) => {
    return {
      ...filter,
      ...sorting,
      ...pagination
    };
  }
);
