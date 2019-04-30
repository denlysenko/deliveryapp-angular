import { DEFAULT_LIMIT } from '@common/constants';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { Payment } from '../../models';
import { PaymentsActions, PaymentsActionTypes } from '../actions';

export interface PaymentsState {
  current: Payment | null;
  filter: FilterChangeEvent;
  sorting: SortingChangeEvent;
  pagination: PageChangeEvent;
}

export const initialState: PaymentsState = {
  current: null,
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
    case PaymentsActionTypes.SELECT: {
      return {
        ...state,
        current: action.payload
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

export const getCurrent = (state: PaymentsState) => state.current;
export const getFilter = (state: PaymentsState) => state.filter;
export const getSorting = (state: PaymentsState) => state.sorting;
export const getPagination = (state: PaymentsState) => state.pagination;
