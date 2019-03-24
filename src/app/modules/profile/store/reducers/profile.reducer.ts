import { ValidationError } from '@common/models';

import { ProfileActions, ProfileActionTypes } from '../actions';

export interface ProfileState {
  loading: boolean;
  error: ValidationError | null;
}

export const initialState: ProfileState = {
  loading: false,
  error: null
};

export function profileReducer(
  state = initialState,
  action: ProfileActions
): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.UPDATE_PROFILE:
    case ProfileActionTypes.UPDATE_PASSWORD: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case ProfileActionTypes.UPDATE_PROFILE_SUCCESS:
    case ProfileActionTypes.UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case ProfileActionTypes.UPDATE_PROFILE_FAIL:
    case ProfileActionTypes.UPDATE_PASSWORD_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
  }

  return state;
}

export const getProfileLoading = (state: ProfileState) => state.loading;
export const getProfileError = (state: ProfileState) => state.error;
