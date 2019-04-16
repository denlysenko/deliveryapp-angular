import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPayments from '../reducers/payments.reducer';

export const getCurrent = createSelector(
  fromFeature.getPaymentsState,
  fromPayments.getCurrent
);

export const getFilter = createSelector(
  fromFeature.getPaymentsState,
  fromPayments.getFilter
);

export const getSorting = createSelector(
  fromFeature.getPaymentsState,
  fromPayments.getSorting
);

export const getPagination = createSelector(
  fromFeature.getPaymentsState,
  fromPayments.getPagination
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
