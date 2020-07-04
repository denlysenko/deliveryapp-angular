import { DEFAULT_LIMIT } from '@common/constants';
import { PageChangeEvent } from '@common/models';

import { Payment, PaymentsFilter } from '../../models';
import { PaymentsActions, PaymentsActionTypes } from '../actions';

export interface PaymentsState {
  current: Payment | null;
  filter: PaymentsFilter['filter'];
  order: PaymentsFilter['order'];
  pagination: PageChangeEvent;
}

export const initialState: PaymentsState = {
  current: null,
  filter: {},
  order: {
    id: 'desc'
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
        order: action.payload
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

    case PaymentsActionTypes.RELOAD: {
      return {
        ...state,
        filter: {
          ...state.filter
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getCurrent = (state: PaymentsState) => state.current;
export const getFilter = (state: PaymentsState) => state.filter;
export const getSorting = (state: PaymentsState) => state.order;
export const getPagination = (state: PaymentsState) => state.pagination;
