import { User } from '../../models';
import { AuthAction, AuthActionTypes } from '../actions/auth.actions';
import { SelfActionTypes, UserAction } from '../actions/self.actions';

// import * as fromProfile from '../../../pages/profile/store/actions';

export interface SelfState {
  loggedIn: boolean;
  loading: boolean;
  error: any | null;
  self: User | null;
}

export const initialState: SelfState = {
  loggedIn: false,
  loading: false,
  error: null,
  self: null
};

export function reducer(
  state = initialState,
  action: UserAction | AuthAction
  // | fromProfile.ProfileActions
): SelfState {
  switch (action.type) {
    case SelfActionTypes.LOAD_SELF: {
      return {
        ...state,
        loading: true,
        error: null,
        self: null
      };
    }

    case AuthActionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        loggedIn: true
      };
    }

    case SelfActionTypes.LOAD_SELF_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        loading: false,
        self: action.payload
      };
    }

    // case fromProfile.UPDATE_PROFILE_SUCCESS: {
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    // }

    case SelfActionTypes.LOAD_SELF_FAIL: {
      return {
        ...state,
        loggedIn: false,
        loading: false,
        error: action.payload
      };
    }

    case SelfActionTypes.LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        self: null
      };
    }
  }

  return state;
}

export const getSelfLoading = (state: SelfState) => state.loading;
export const getSelfError = (state: SelfState) => state.error;
export const getSelf = (state: SelfState) => state.self;
export const getLoggedIn = (state: SelfState) => state.loggedIn;
