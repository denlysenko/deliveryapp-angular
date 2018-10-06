import { User } from '../../models';
import * as fromLogin from '../actions/login.actions';
import * as fromRegister from '../actions/registration.actions';
import * as fromUser from '../actions/user.actions';

// import * as fromProfile from '../../../pages/profile/store/actions';

export interface UserState {
  loggedIn: boolean;
  loading: boolean;
  error: any | null;
  user: User | null;
}

export const initialState: UserState = {
  loggedIn: false,
  loading: false,
  error: null,
  user: null
};

export function reducer(
  state = initialState,
  action:
    | fromUser.UserAction
    | fromLogin.LoginAction
    | fromRegister.RegisterAction
  // | fromProfile.ProfileActions
): UserState {
  switch (action.type) {
    case fromUser.LOAD_USER: {
      return {
        ...state,
        loading: true,
        error: null,
        user: null
      };
    }

    case fromLogin.LOGIN_SUCCESS:
    case fromRegister.REGISTER_SUCCESS: {
      return {
        ...state,
        loggedIn: true
      };
    }

    case fromUser.LOAD_USER_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.payload
      };
    }

    // case fromProfile.UPDATE_PROFILE_SUCCESS: {
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    // }

    case fromUser.LOAD_USER_FAIL: {
      return {
        ...state,
        loggedIn: false,
        loading: false,
        error: action.payload
      };
    }

    case fromUser.LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: null
      };
    }
  }

  return state;
}

export const getUserLoading = (state: UserState) => state.loading;
export const getUserError = (state: UserState) => state.error;
export const getUser = (state: UserState) => state.user;
export const getLoggedIn = (state: UserState) => state.loggedIn;
