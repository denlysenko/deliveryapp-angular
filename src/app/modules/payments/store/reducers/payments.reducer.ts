import { DEFAULT_LIMIT } from '@common/constants';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent,
  ValidationError
} from '@common/models';

import { PaymentsActions, PaymentsActionTypes } from '../actions';

export interface PaymentsState {
  loading: boolean;
  error: ValidationError | null;
  filter: FilterChangeEvent;
  sorting: SortingChangeEvent;
  pagination: PageChangeEvent;
}

export const initialState: PaymentsState = {
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

export function paymentsReducer(
  state = initialState,
  action: PaymentsActions
): PaymentsState {
  switch (action.type) {
    case PaymentsActionTypes.CREATE:
    case PaymentsActionTypes.UPDATE: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case PaymentsActionTypes.CREATE_SUCCESS:
    case PaymentsActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case PaymentsActionTypes.CREATE_FAIL:
    case PaymentsActionTypes.UPDATE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case PaymentsActionTypes.FILTER_CHANGE: {
      return {
        ...state,
        filter: action.payload,
        pagination: {
          ...state.pagination,
          offset: 0
        }
      };
    }

    case PaymentsActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        sorting: action.payload
      };
    }

    case PaymentsActionTypes.PAGE_CHANGE: {
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

export const getLoading = (state: PaymentsState) => state.loading;
export const getError = (state: PaymentsState) => state.error;
export const getFilter = (state: PaymentsState) => state.filter;
export const getSorting = (state: PaymentsState) => state.sorting;
export const getPagination = (state: PaymentsState) => state.pagination;
