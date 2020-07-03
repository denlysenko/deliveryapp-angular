import { DEFAULT_LIMIT } from '@common/constants';
import { Roles } from '@common/enums';
import { PageChangeEvent } from '@common/models';

import { User, UsersFilter } from '../../models';
import { UsersActions, UsersActionTypes } from '../actions';

export interface UsersState {
  current: User | null;
  filter: UsersFilter['filter'];
  order: UsersFilter['order'];
  pagination: PageChangeEvent;
}

export const initialState: UsersState = {
  current: null,
  filter: {
    role: [Roles.MANAGER, Roles.ADMIN]
  },
  order: {
    id: 'desc'
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
        filter: {
          ...initialState.filter,
          ...action.payload
        },
        pagination: {
          ...state.pagination,
          offset: 0
        }
      };
    }

    case UsersActionTypes.SORTING_CHANGE: {
      return {
        ...state,
        order: action.payload
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

    case UsersActionTypes.RELOAD: {
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

export const getCurrent = (state: UsersState) => state.current;
export const getFilter = (state: UsersState) => state.filter;
export const getSorting = (state: UsersState) => state.order;
export const getPagination = (state: UsersState) => state.pagination;
