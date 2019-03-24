import { User } from '@auth/models';

import { PasswordPayload } from '../../models';
import {
  UpdatePassword,
  UpdatePasswordFail,
  UpdatePasswordSuccess,
  UpdateProfile,
  UpdateProfileFail,
  UpdateProfileSuccess
} from '../actions';
import { initialState, profileReducer } from './profile.reducer';

describe('ProfileReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = profileReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('UPDATE_PROFILE action', () => {
    it('should set loading to true', () => {
      const payload: User = {
        email: 'test@test.com',
        phone: '1234'
      };
      const action = new UpdateProfile(payload);
      const state = profileReducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('UPDATE_PASSWORD action', () => {
    it('should set loading to true', () => {
      const payload: PasswordPayload = {
        oldPassword: 'test',
        newPassword: '1234'
      };
      const action = new UpdatePassword(payload);
      const state = profileReducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('UPDATE_PROFILE_SUCCESS action', () => {
    it('should set loading to false', () => {
      const payload: User = {
        email: 'test@test.com',
        phone: '1234'
      };
      const action = new UpdateProfileSuccess(payload);
      const state = profileReducer(initialState, action);
      expect(state.loading).toEqual(false);
    });
  });

  describe('UPDATE_PASSWORD_SUCCESS action', () => {
    it('should set loading to false', () => {
      const action = new UpdatePasswordSuccess();
      const state = profileReducer(initialState, action);
      expect(state.loading).toEqual(false);
    });
  });

  describe('UPDATE_PROFILE_FAIL action', () => {
    it('should set error to payload value', () => {
      const payload = { message: 'Error message' } as any;
      const action = new UpdateProfileFail(payload);
      const state = profileReducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
    });
  });

  describe('UPDATE_PASSWORD_FAIL action', () => {
    it('should set error to payload value', () => {
      const payload = { message: 'Error message' } as any;
      const action = new UpdatePasswordFail(payload);
      const state = profileReducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
    });
  });
});
