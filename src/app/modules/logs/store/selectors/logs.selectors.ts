import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLogs from '../reducers/logs.reducer';

export const getFilter = createSelector(
  fromFeature.getLogsState,
  fromLogs.getFilter
);

export const getSorting = createSelector(
  fromFeature.getLogsState,
  fromLogs.getSorting
);

export const getPagination = createSelector(
  fromFeature.getLogsState,
  fromLogs.getPagination
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
