import { LoginForm, RegistrationForm } from '../../models';
import { AuthFail, AuthSuccess, Login, Register } from '../actions/auth.actions';
import * as fromAuth from './auth.reducer';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromAuth;
      const action = {} as any;
      const state = fromAuth.reducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('LOGIN action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromAuth;
      const payload: LoginForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new Login(payload);
      const state = fromAuth.reducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('REGISTER action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromAuth;
      const payload: RegistrationForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new Register(payload);
      const state = fromAuth.reducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('AUTH_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromAuth;
      const action = new AuthSuccess();
      const state = fromAuth.reducer(initialState, action);
      expect(state.loading).toEqual(false);
    });
  });

  describe('AUTH_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromAuth;
      const payload = { message: 'Error message' } as any;
      const action = new AuthFail(payload);
      const state = fromAuth.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
    });
  });
});
