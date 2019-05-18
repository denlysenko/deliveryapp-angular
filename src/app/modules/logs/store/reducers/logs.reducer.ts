import { DEFAULT_LIMIT } from '@common/constants';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { LogsActions, LogsActionTypes } from '../actions';

export interface LogsState {
  filter: FilterChangeEvent;
  sorting: SortingChangeEvent;
  pagination: PageChangeEvent;
}

export const initialState: LogsState = {
  filter: {},
  sorting: {
    'order[createdAt]': 'desc'
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
        sorting: action.payload
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
  }

  return state;
}

export const getFilter = (state: LogsState) => state.filter;
export const getSorting = (state: LogsState) => state.sorting;
export const getPagination = (state: LogsState) => state.pagination;
