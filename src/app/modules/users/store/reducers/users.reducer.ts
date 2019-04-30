import { DEFAULT_LIMIT } from '@common/constants';
import { Roles } from '@common/enums';
import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { User } from '../../models';
import { UsersActions, UsersActionTypes } from '../actions';

export interface UsersState {
  current: User | null;
  filter: FilterChangeEvent;
  sorting: SortingChangeEvent;
  pagination: PageChangeEvent;
}

export const initialState: UsersState = {
  current: null,
  filter: {
    'filter[role][0]': Roles.MANAGER.toString(),
    'filter[role][1]': Roles.ADMIN.toString()
  },
  sorting: {
    'order[id]': 'asc'
  },
  pagination: {
    offset: 0,
    limit: DEFAULT_LIMIT
  }
};

export function usersReducer(
  state = initialState,
  action: UsersActions
): UsersState {
  switch (action.type) {
    case UsersActionTypes.SELECT: {
      return {
        ...state,
        current: action.payload
      };
    }

    case UsersActionTypes.FILTER_CHANGE: {
      return {
        ...state,
        filter: action.payload,
        pagination: {
          ...state.pagination,
          offset: 0
        }
      };
    }

    case UsersActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        sorting: action.payload
      };
    }

    case UsersActionTypes.PAGE_CHANGE: {
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

export const getCurrent = (state: UsersState) => state.current;
export const getFilter = (state: UsersState) => state.filter;
export const getSorting = (state: UsersState) => state.sorting;
export const getPagination = (state: UsersState) => state.pagination;
