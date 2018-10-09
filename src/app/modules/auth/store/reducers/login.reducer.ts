import { LoginError } from '../../models';
import * as fromLogin from '../actions/login.actions';

export interface LoginState {
  loading: boolean;
  error: LoginError | null;
}

export const initialState: LoginState = {
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: fromLogin.LoginAction
): LoginState {
  switch (action.type) {
    case fromLogin.LOGIN: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case fromLogin.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case fromLogin.LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
  }

  return state;
}

export const getLoginLoading = (state: LoginState) => state.loading;
export const getLoginError = (state: LoginState) => state.error;
