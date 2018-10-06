import { User } from '../../models';
import * as fromUser from './user.actions';

describe('User Actions', () => {
  describe('LoadUser', () => {
    it('should create an action', () => {
      const action = new fromUser.LoadUser();
      expect({ ...action }).toEqual({
        type: fromUser.LOAD_USER
      });
    });
  });

  describe('LoadUserSuccess', () => {
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
      const action = new fromUser.LoadUserSuccess(payload);
      expect({ ...action }).toEqual({
        type: fromUser.LOAD_USER_SUCCESS,
        payload: payload
      });
    });
  });

  describe('LoadUserFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' };
      const action = new fromUser.LoadUserFail(payload);
      expect({ ...action }).toEqual({
        type: fromUser.LOAD_USER_FAIL,
        payload: payload
      });
    });
  });

  describe('Logout', () => {
    it('should create an action', () => {
      const action = new fromUser.Logout();
      expect({ ...action }).toEqual({
        type: fromUser.LOGOUT
      });
    });
  });
});
