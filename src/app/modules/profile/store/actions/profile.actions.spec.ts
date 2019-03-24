import { User } from '@auth/models';

import { PasswordPayload } from '../../models';
import {
  ProfileActionTypes,
  UpdatePassword,
  UpdatePasswordFail,
  UpdatePasswordSuccess,
  UpdateProfile,
  UpdateProfileFail,
  UpdateProfileSuccess
} from './profile.actions';

describe('Profile Actions', () => {
  describe('UpdateProfile', () => {
    it('should create an action', () => {
      const payload: User = {
        email: 'test@test.com',
        phone: '12345'
      };

      const action = new UpdateProfile(payload);
      expect({ ...action }).toEqual({
        type: ProfileActionTypes.UPDATE_PROFILE,
        payload: payload
      });
    });
  });

  describe('UpdateProfileSuccess', () => {
    it('should create an action', () => {
      const payload: User = {
        email: 'test@test.com',
        phone: '12345'
      };

      const action = new UpdateProfileSuccess(payload);
      expect({ ...action }).toEqual({
        type: ProfileActionTypes.UPDATE_PROFILE_SUCCESS,
        payload: payload
      });
    });
  });

  describe('UpdateProfileFail', () => {
    it('should create an action', () => {
      const payload: any = { message: 'Error message' };

      const action = new UpdateProfileFail(payload);
      expect({ ...action }).toEqual({
        type: ProfileActionTypes.UPDATE_PROFILE_FAIL,
        payload: payload
      });
    });
  });

  describe('UpdatePassword', () => {
    it('should create an action', () => {
      const payload: PasswordPayload = {
        oldPassword: 'test',
        newPassword: 'test2'
      };

      const action = new UpdatePassword(payload);
      expect({ ...action }).toEqual({
        type: ProfileActionTypes.UPDATE_PASSWORD,
        payload: payload
      });
    });
  });

  describe('UpdatePasswordSuccess', () => {
    it('should create an action', () => {
      const action = new UpdatePasswordSuccess();
      expect({ ...action }).toEqual({
        type: ProfileActionTypes.UPDATE_PASSWORD_SUCCESS
      });
    });
  });

  describe('UpdatePasswordFail', () => {
    it('should create an action', () => {
      const payload: any = { message: 'Error message' };

      const action = new UpdatePasswordFail(payload);
      expect({ ...action }).toEqual({
        type: ProfileActionTypes.UPDATE_PASSWORD_FAIL,
        payload: payload
      });
    });
  });
});
