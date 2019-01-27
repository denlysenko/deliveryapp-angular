import { AuthForm } from '../../models';
import { AuthFail, AuthSuccess, Login, Register } from '../actions/auth.actions';
import { authReducer, initialState } from './auth.reducer';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = authReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('LOGIN action', () => {
    it('should set loading to true', () => {
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new Login(payload);
      const { loading, error } = authReducer(initialState, action);
      expect(loading).toEqual(true);
      expect(error).toEqual(null);
    });
  });

  describe('REGISTER action', () => {
    it('should set loading to true', () => {
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new Register(payload);
      const { loading, error } = authReducer(initialState, action);
      expect(loading).toEqual(true);
      expect(error).toEqual(null);
    });
  });

  describe('AUTH_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const action = new AuthSuccess();
      const { loading } = authReducer(initialState, action);
      expect(loading).toEqual(false);
    });
  });

  describe('AUTH_FAIL Action', () => {
    it('should set error to payload value', () => {
      const payload = { message: 'Error message' } as any;
      const action = new AuthFail(payload);
      const { loading, error } = authReducer(initialState, action);
      expect(loading).toEqual(false);
      expect(error).toEqual(payload);
    });
  });
});
