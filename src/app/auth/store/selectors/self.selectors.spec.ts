import { TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { User } from '../../models';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from './self.selectors';

describe('User Selectors', () => {
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

  describe('getSelfLoading', () => {
    it('should return true when LoadSelf was dispatched', () => {
      let result;

      store.select(fromSelectors.getSelfLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new fromActions.LoadSelf());
      expect(result).toEqual(true);
    });

    it('should return false when LoadSelfSuccess was dispatched', () => {
      let result;
      const payload: User = {
        id: 1,
        email: 'test@test.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        phone: '1(111) 111-11-11',
        role: 1
      };

      store.select(fromSelectors.getSelfLoading).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.LoadSelfSuccess(payload));
      expect(result).toEqual(false);
    });
  });

  describe('getLoadSelfError', () => {
    it('should return error', () => {
      const loadUserError = {
        message: 'Error'
      };

      let result;

      store.select(fromSelectors.getSelfError).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.LoadSelfFail(loadUserError));
      expect(result).toEqual(loadUserError);
    });
  });

  describe('getLoggedIn', () => {
    it('should return true when load was success', () => {
      let result;
      const payload: User = {
        id: 1,
        email: 'test@test.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        phone: '1(111) 111-11-11',
        role: 1
      };

      store.select(fromSelectors.getLoggedIn).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.LoadSelfSuccess(payload));
      expect(result).toEqual(true);
    });

    it('should return false when logout was dispatched', () => {
      let result;

      store.select(fromSelectors.getLoggedIn).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.Logout());
      expect(result).toEqual(false);
    });
  });

  describe('getSelf', () => {
    it('should return user', () => {
      let result;
      const payload: User = {
        id: 1,
        email: 'test@test.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        phone: '1(111) 111-11-11',
        role: 1
      };

      store.select(fromSelectors.getSelf).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.LoadSelfSuccess(payload));
      expect(result).toEqual(payload);
    });

    it('should return null when logout was dispatched', () => {
      let result;

      store.select(fromSelectors.getSelf).subscribe(value => {
        result = value;
      });

      store.dispatch(new fromActions.Logout());
      expect(result).toEqual(null);
    });
  });

  describe('getSelfRole', () => {
    it('should return user role', () => {
      let result;
      const payload: User = {
        id: 1,
        email: 'test@test.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        phone: '1(111) 111-11-11',
        role: 1
      };
      store.dispatch(new fromActions.LoadSelfSuccess(payload));

      store.select(fromSelectors.getSelfRole).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(payload.role);
    });
  });
});
