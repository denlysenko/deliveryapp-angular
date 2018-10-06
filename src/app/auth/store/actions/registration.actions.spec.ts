import { RegistrationForm } from '../../models';
import * as fromRegister from './registration.actions';

describe('Registration Actions', () => {
  describe('Register', () => {
    it('should create an action', () => {
      const payload: RegistrationForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new fromRegister.Register(payload);
      expect({ ...action }).toEqual({
        type: fromRegister.REGISTER,
        payload: payload
      });
    });
  });

  describe('RegisterSuccess', () => {
    it('should create an action', () => {
      const action = new fromRegister.RegisterSuccess();
      expect({ ...action }).toEqual({
        type: fromRegister.REGISTER_SUCCESS
      });
    });
  });

  describe('RegisterFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' };
      const action = new fromRegister.RegisterFail(payload);
      expect({ ...action }).toEqual({
        type: fromRegister.REGISTER_FAIL,
        payload: payload
      });
    });
  });
});
