import { RegistrationForm } from '../../models';
import * as fromActions from '../actions/registration.actions';
import * as fromRegister from './register.reducer';

describe('RegisterReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromRegister;
      const action = {} as any;
      const state = fromRegister.reducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('REGISTER action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromRegister;
      const payload: RegistrationForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new fromActions.Register(payload);
      const state = fromRegister.reducer(initialState, action);
      expect(state.loading).toEqual(true);
      expect(state.error).toEqual(null);
    });
  });

  describe('REGISTER_SUCCESS Action', () => {
    it('should set loading to false', () => {
      const { initialState } = fromRegister;
      const action = new fromActions.RegisterSuccess();
      const state = fromRegister.reducer(initialState, action);
      expect(state.loading).toEqual(false);
    });
  });

  describe('REGISTER_FAIL Action', () => {
    it('should set error to payload value', () => {
      const { initialState } = fromRegister;
      const payload = { message: 'Error message' };
      const action = new fromActions.RegisterFail(payload);
      const state = fromRegister.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(payload);
    });
  });
});
