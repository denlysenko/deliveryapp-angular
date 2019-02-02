import { AuthForm } from '../../models';
import {
  AuthActionTypes,
  AuthFail,
  AuthSuccess,
  Login,
  Register
} from './auth.actions';

describe('Auth Actions', () => {
  describe('Login', () => {
    it('should create an action', () => {
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new Login(payload);
      expect({ ...action }).toEqual({
        type: AuthActionTypes.LOGIN,
        payload
      });
    });
  });

  describe('Register', () => {
    it('should create an action', () => {
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new Register(payload);
      expect({ ...action }).toEqual({
        type: AuthActionTypes.REGISTER,
        payload
      });
    });
  });

  describe('AuthSuccess', () => {
    it('should create an action', () => {
      const action = new AuthSuccess();
      expect({ ...action }).toEqual({
        type: AuthActionTypes.AUTH_SUCCESS
      });
    });
  });

  describe('AuthFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' } as any;
      const action = new AuthFail(payload);
      expect({ ...action }).toEqual({
        type: AuthActionTypes.AUTH_FAIL,
        payload
      });
    });
  });
});
