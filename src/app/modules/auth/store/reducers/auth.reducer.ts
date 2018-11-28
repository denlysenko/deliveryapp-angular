import { ValidationError } from '@common/models';

import { LoginError } from '../../models';
import { AuthAction, AuthActionTypes } from '../actions';

export interface AuthState {
  loading: boolean;
  error: LoginError | ValidationError | null;
}

export const initialState: AuthState = {
  loading: false,
  error: null
};

export function reducer(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.REGISTER: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case AuthActionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case AuthActionTypes.AUTH_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
  }

  return state;
}

export const getLoginLoading = (state: AuthState) => state.loading;
export const getLoginError = (state: AuthState) => state.error;
