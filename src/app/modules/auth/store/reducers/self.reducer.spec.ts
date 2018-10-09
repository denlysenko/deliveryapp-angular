import { User } from '../../models';
import * as fromActions from '../actions/self.actions';
import * as fromSelf from './self.reducer';

describe('SelfReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromSelf;
      const action = {} as any;
      const state = fromSelf.reducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('LOAD_SELF action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromSelf;
      const action = new fromActions.LoadSelf();
      const state = fromSelf.reducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
      expect(state.self).toEqual(null);
    });
  });

  describe('LOAD_SELF_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromSelf;
      const payload: User = {
        id: 1,
        email: 'test@test.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        phone: '1(111) 111-11-11',
        role: 1
      };
      const action = new fromActions.LoadSelfSuccess(payload);
      const state = fromSelf.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.self).toEqual(payload);
      expect(state.loggedIn).toEqual(true);
    });
  });

  describe('LOAD_SELF_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromSelf;
      const payload = { message: 'Error message' };
      const action = new fromActions.LoadSelfFail(payload);
      const state = fromSelf.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
      expect(state.self).toEqual(null);
      expect(state.loggedIn).toEqual(false);
    });
  });

  describe('LOGOUT Action', () => {
    it('should set user to null', () => {
      const { initialState } = fromSelf;
      const action = new fromActions.Logout();
      const state = fromSelf.reducer(initialState, action);
      expect(state.self).toEqual(null);
      expect(state.loggedIn).toEqual(false);
    });
  });
});
