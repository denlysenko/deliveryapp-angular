import { DEFAULT_LIMIT } from '@common/constants';
import { PageChangeEvent } from '@common/models';

import { LogsActions, LogsActionTypes } from '../actions';
import { LogsFilter } from '../../models';

export interface LogsState {
  filter: LogsFilter['filter'];
  order: LogsFilter['order'];
  pagination: PageChangeEvent;
}

export const initialState: LogsState = {
  filter: {},
  order: {
    createdAt: 'desc'
  },
  pagination: {
    offset: 0,
    limit: DEFAULT_LIMIT
  }
};

export function logsReducer(
  state = initialState,
  action: LogsActions
): LogsState {
  switch (action.type) {
    case LogsActionTypes.FILTER_CHANGE: {
      return {
        ...state,
        filter: action.payload,
        pagination: {
          ...state.pagination,
          offset: 0
        }
      };
    }

    case LogsActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        order: action.payload
      };
    }

    case LogsActionTypes.PAGE_CHANGE: {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getFilter = (state: LogsState) => state.filter;
export const getSorting = (state: LogsState) => state.order;
export const getPagination = (state: LogsState) => state.pagination;
