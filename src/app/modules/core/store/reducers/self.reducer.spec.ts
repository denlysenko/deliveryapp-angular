import { User } from '@users/models';

import {
  LoadSelf,
  LoadSelfFail,
  LoadSelfSuccess,
  Logout
} from '../actions/self.actions';
import { initialState, selfReducer } from './self.reducer';

describe('SelfReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = selfReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('LOAD_SELF action', () => {
    it('should set loading to true', () => {
      const action = new LoadSelf();
      const { loading, error, user } = selfReducer(initialState, action);
      expect(loading).toEqual(true);
      expect(error).toEqual(null);
      expect(user).toEqual(null);
    });
  });

  describe('LOAD_SELF_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const payload: User = {
        id: 1,
        email: 'test@test.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        phone: '1(111) 111-11-11',
        role: 1
      };
      const action = new LoadSelfSuccess(payload);
      const { loading, user } = selfReducer(initialState, action);
      expect(loading).toEqual(false);
      expect(user).toEqual(payload);
    });
  });

  describe('LOAD_SELF_FAIL Action', () => {
    it('should set error to payload value', () => {
      const payload = { message: 'Error message' };
      const action = new LoadSelfFail(payload);
      const { loading, error, user } = selfReducer(initialState, action);
      expect(loading).toEqual(false);
      expect(error).toEqual(payload);
      expect(user).toEqual(null);
    });
  });

  describe('LOGOUT Action', () => {
    it('should set user to null', () => {
      const action = new Logout();
      const { user } = selfReducer(initialState, action);
      expect(user).toEqual(null);
    });
  });
});
