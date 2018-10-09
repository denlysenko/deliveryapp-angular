import { User } from '../../models';
import * as fromLogin from '../actions/login.actions';
import * as fromRegister from '../actions/registration.actions';
import * as fromSelf from '../actions/self.actions';

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
  action:
    | fromSelf.UserAction
    | fromLogin.LoginAction
    | fromRegister.RegisterAction
  // | fromProfile.ProfileActions
): SelfState {
  switch (action.type) {
    case fromSelf.LOAD_SELF: {
      return {
        ...state,
        loading: true,
        error: null,
        self: null
      };
    }

    case fromLogin.LOGIN_SUCCESS:
    case fromRegister.REGISTER_SUCCESS: {
      return {
        ...state,
        loggedIn: true
      };
    }

    case fromSelf.LOAD_SELF_SUCCESS: {
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

    case fromSelf.LOAD_SELF_FAIL: {
      return {
        ...state,
        loggedIn: false,
        loading: false,
        error: action.payload
      };
    }

    case fromSelf.LOGOUT: {
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
