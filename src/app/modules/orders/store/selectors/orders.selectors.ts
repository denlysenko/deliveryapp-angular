import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromOrders from '../reducers/orders.reducer';

export const getLoading = createSelector(
  fromFeature.getOrdersState,
  fromOrders.getLoading
);

export const getError = createSelector(
  fromFeature.getOrdersState,
  fromOrders.getError
);

export const getFilter = createSelector(
  fromFeature.getOrdersState,
  fromOrders.getFilter
);

export const getSorting = createSelector(
  fromFeature.getOrdersState,
  fromOrders.getSorting
);

export const getPagination = createSelector(
  fromFeature.getOrdersState,
  fromOrders.getPagination
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
