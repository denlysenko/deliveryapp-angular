import { ValidationError } from '@common/models';
import { FilterChangeEvent, PageChangeEvent, SortingChangeEvent } from '@core/models';

import { OrdersActions, OrdersActionTypes } from '../actions';

export interface OrdersState {
  loading: boolean;
  error: ValidationError | null;
  filter: FilterChangeEvent;
  sorting: SortingChangeEvent;
  pagination: PageChangeEvent;
}

export const initialState: OrdersState = {
  loading: false,
  error: null,
  filter: {},
  sorting: {
    'order[id]': 'asc'
  },
  pagination: {
    offset: 0,
    limit: 10
  }
};

export function reducer(
  state = initialState,
  action: OrdersActions
): OrdersState {
  switch (action.type) {
    case OrdersActionTypes.CREATE:
    case OrdersActionTypes.UPDATE: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case OrdersActionTypes.CREATE_SUCCESS:
    case OrdersActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case OrdersActionTypes.CREATE_FAIL:
    case OrdersActionTypes.UPDATE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case OrdersActionTypes.FILTER_CHANGE: {
      return {
        ...state,
        filter: action.payload
      };
    }

    case OrdersActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        sorting: action.payload
      };
    }

    case OrdersActionTypes.PAGE_CHANGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };
    }
  }

  return state;
}

export const getOrdersLoading = (state: OrdersState) => state.loading;
export const getOrdersError = (state: OrdersState) => state.error;
export const getOrdersFilter = (state: OrdersState) => state.filter;
export const getOrdersSorting = (state: OrdersState) => state.sorting;
export const getOrdersPagination = (state: OrdersState) => state.pagination;
