import { LoginForm } from '../../models';
import * as fromActions from '../actions/login.actions';
import * as fromLogin from './login.reducer';

describe('LoginReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromLogin;
      const action = {} as any;
      const state = fromLogin.reducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('LOGIN action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromLogin;
      const payload: LoginForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new fromActions.Login(payload);
      const state = fromLogin.reducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('LOGIN_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromLogin;
      const action = new fromActions.LoginSuccess();
      const state = fromLogin.reducer(initialState, action);
      expect(state.loading).toEqual(false);
    });
  });

  describe('LOGIN_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromLogin;
      const payload = { message: 'Error message' } as any;
      const action = new fromActions.LoginFail(payload);
      const state = fromLogin.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
    });
  });
});
