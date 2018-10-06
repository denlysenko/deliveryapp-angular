import { User } from '../../models';
import * as fromActions from '../actions/user.actions';
import * as fromUser from './user.reducer';

describe('UserReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUser;
      const action = {} as any;
      const state = fromUser.reducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('LOAD_USER action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromUser;
      const action = new fromActions.LoadUser();
      const state = fromUser.reducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
      expect(state.user).toEqual(null);
    });
  });

  describe('LOAD_USER_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromUser;
      const payload: User = {
        id: 1,
        email: 'test@test.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        phone: '1(111) 111-11-11',
        role: 1
      };
      const action = new fromActions.LoadUserSuccess(payload);
      const state = fromUser.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.user).toEqual(payload);
      expect(state.loggedIn).toEqual(true);
    });
  });

  describe('LOAD_USER_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromUser;
      const payload = { message: 'Error message' };
      const action = new fromActions.LoadUserFail(payload);
      const state = fromUser.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
      expect(state.user).toEqual(null);
      expect(state.loggedIn).toEqual(false);
    });
  });

  describe('LOGOUT Action', () => {
    it('should set user to null', () => {
      const { initialState } = fromUser;
      const action = new fromActions.Logout();
      const state = fromUser.reducer(initialState, action);
      expect(state.user).toEqual(null);
      expect(state.loggedIn).toEqual(false);
    });
  });
});
