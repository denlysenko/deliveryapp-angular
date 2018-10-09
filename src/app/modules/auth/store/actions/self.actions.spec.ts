import { User } from '../../models';
import * as fromSelf from './self.actions';

describe('Self Actions', () => {
  describe('LoadSelf', () => {
    it('should create an action', () => {
      const action = new fromSelf.LoadSelf();
      expect({ ...action }).toEqual({
        type: fromSelf.LOAD_SELF
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
      const action = new fromSelf.LoadSelfSuccess(payload);
      expect({ ...action }).toEqual({
        type: fromSelf.LOAD_SELF_SUCCESS,
        payload: payload
      });
    });
  });

  describe('LoadSelfFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' };
      const action = new fromSelf.LoadSelfFail(payload);
      expect({ ...action }).toEqual({
        type: fromSelf.LOAD_SELF_FAIL,
        payload: payload
      });
    });
  });

  describe('Logout', () => {
    it('should create an action', () => {
      const action = new fromSelf.Logout();
      expect({ ...action }).toEqual({
        type: fromSelf.LOGOUT
      });
    });
  });
});
