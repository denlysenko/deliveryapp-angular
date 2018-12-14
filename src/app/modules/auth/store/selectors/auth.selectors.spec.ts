import { TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { AuthForm } from '../../models';
import { AuthFail, AuthSuccess, Login, Register } from '../actions/auth.actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from './auth.selectors';

describe('Auth Selectors', () => {
  let store: Store<fromReducers.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: fromReducers.reducer
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAuthLoading', () => {
    it('should return true when Login was dispatched', () => {
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };

      let result;

      store.select(fromSelectors.getAuthLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new Login(payload));
      expect(result).toEqual(true);
    });

    it('should return true when Register was dispatched', () => {
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };

      let result;

      store.select(fromSelectors.getAuthLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new Register(payload));
      expect(result).toEqual(true);
    });

    it('should return false when AuthSuccess was dispatched', () => {
      let result;

      store.select(fromSelectors.getAuthLoading).subscribe(value => {
        result = value;
      });

      store.dispatch(new AuthSuccess());
      expect(result).toEqual(false);
    });
  });

  describe('getAuthError', () => {
    it('should return error', () => {
      const loginError = {
        message: 'Error'
      };

      let result;

      store.select(fromSelectors.getAuthError).subscribe(value => {
        result = value;
      });

      store.dispatch(new AuthFail(loginError as any));
      expect(result).toEqual(loginError);
    });
  });
});
