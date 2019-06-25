import { User } from '@users/models';

import { SelfActions, SelfActionTypes } from '../actions/self.actions';

export interface SelfState {
  loading: boolean;
  error: any | null;
  user: User | null;
}

export const initialState: SelfState = {
  loading: false,
  error: null,
  user: null
};

export function selfReducer(
  state = initialState,
  action: SelfActions
): SelfState {
  switch (action.type) {
    case SelfActionTypes.LOAD_SELF: {
      return {
        ...state,
        loading: true,
        error: null,
        user: null
      };
    }

    case SelfActionTypes.LOAD_SELF_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    }

    case SelfActionTypes.LOAD_SELF_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case SelfActionTypes.LOGOUT: {
      return {
        ...state,
        user: null
      };
    }
  }

  return state;
}

export const getSelfLoading = (state: SelfState) => state.loading;
export const getSelfError = (state: SelfState) => state.error;
export const getSelf = (state: SelfState) => state.user;
