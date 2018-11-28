import { User } from '../../models';
import { LoadSelf, LoadSelfFail, LoadSelfSuccess, Logout, SelfActionTypes } from './self.actions';

describe('Self Actions', () => {
  describe('LoadSelf', () => {
    it('should create an action', () => {
      const action = new LoadSelf();
      expect({ ...action }).toEqual({
        type: SelfActionTypes.LOAD_SELF
      });
    });
  });

  describe('LoadSelfSuccess', () => {
    it('should create an action', () => {
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
      expect({ ...action }).toEqual({
        type: SelfActionTypes.LOAD_SELF_SUCCESS,
        payload: payload
      });
    });
  });

  describe('LoadSelfFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' };
      const action = new LoadSelfFail(payload);
      expect({ ...action }).toEqual({
        type: SelfActionTypes.LOAD_SELF_FAIL,
        payload: payload
      });
    });
  });

  describe('Logout', () => {
    it('should create an action', () => {
      const action = new Logout();
      expect({ ...action }).toEqual({
        type: SelfActionTypes.LOGOUT
      });
    });
  });
});
