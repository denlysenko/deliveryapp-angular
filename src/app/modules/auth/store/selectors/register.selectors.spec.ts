import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { RegistrationForm } from '../../models';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from './register.selectors';

describe('Register Selectors', () => {
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

  describe('getRegisterLoading', () => {
    it('should return true when Register was dispatched', () => {
      const payload: RegistrationForm = {
        email: 'test@test.com',
        password: 'password'
      };

      let result;

      store.select(fromSelectors.getRegisterLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new fromActions.Register(payload));
      expect(result).toEqual(true);
    });

    it('should return false when RegisterSuccess was dispatched', () => {
      let result;

      store.select(fromSelectors.getRegisterLoading).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.RegisterSuccess());
      expect(result).toEqual(false);
    });
  });

  describe('getRegisterError', () => {
    it('should return error', () => {
      const registerError = {
        message: 'Error'
      };

      let result;

      store.select(fromSelectors.getRegisterError).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.RegisterFail(registerError));
      expect(result).toEqual(registerError);
    });
  });
});
