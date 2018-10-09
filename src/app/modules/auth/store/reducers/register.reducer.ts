import { ValidationError } from '@common/models';

import * as fromRegister from '../actions/registration.actions';

export interface RegisterState {
  loading: boolean;
  error: ValidationError | null;
}

export const initialState: RegisterState = {
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: fromRegister.RegisterAction
): RegisterState {
  switch (action.type) {
    case fromRegister.REGISTER: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case fromRegister.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case fromRegister.REGISTER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
  }

  return state;
}

export const getRegisterLoading = (state: RegisterState) => state.loading;
export const getRegisterError = (state: RegisterState) => state.error;
