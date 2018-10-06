import { LoginForm } from '../../models';
import * as fromLogin from './login.actions';

describe('Login Actions', () => {
  describe('Login', () => {
    it('should create an action', () => {
      const payload: LoginForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new fromLogin.Login(payload);
      expect({ ...action }).toEqual({
        type: fromLogin.LOGIN,
        payload: payload
      });
    });
  });

  describe('LoginSuccess', () => {
    it('should create an action', () => {
      const action = new fromLogin.LoginSuccess();
      expect({ ...action }).toEqual({
        type: fromLogin.LOGIN_SUCCESS
      });
    });
  });

  describe('LoginFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' } as any;
      const action = new fromLogin.LoginFail(payload);
      expect({ ...action }).toEqual({
        type: fromLogin.LOGIN_FAIL,
        payload: payload
      });
    });
  });
});
