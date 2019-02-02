import { DEFAULT_LIMIT } from '@common/constants';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent,
  ValidationError
} from '@common/models';

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
    limit: DEFAULT_LIMIT
  }
};

export function ordersReducer(
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

export const getLoading = (state: OrdersState) => state.loading;
export const getError = (state: OrdersState) => state.error;
export const getFilter = (state: OrdersState) => state.filter;
export const getSorting = (state: OrdersState) => state.sorting;
export const getPagination = (state: OrdersState) => state.pagination;
