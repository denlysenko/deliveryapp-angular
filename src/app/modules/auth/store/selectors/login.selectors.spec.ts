import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { LoginForm } from '../../models';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from './login.selectors';

describe('Login Selectors', () => {
  let store: Store<fromReducers.AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getLoginLoading', () => {
    it('should return true when Login was dispatched', () => {
      const payload: LoginForm = {
        email: 'test@test.com',
        password: 'password'
      };

      let result;

      store.select(fromSelectors.getLoginLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new fromActions.Login(payload));
      expect(result).toEqual(true);
    });

    it('should return false when LoginSuccess was dispatched', () => {
      let result;

      store.select(fromSelectors.getLoginLoading).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.LoginSuccess());
      expect(result).toEqual(false);
    });
  });

  describe('getLogingError', () => {
    it('should return error', () => {
      const loginError = {
        message: 'Error'
      };

      let result;

      store.select(fromSelectors.getLoginError).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.LoginFail(loginError as any));
      expect(result).toEqual(loginError);
    });
  });
});
