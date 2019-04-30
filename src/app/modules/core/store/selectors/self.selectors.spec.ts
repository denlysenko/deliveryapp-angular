import { TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { User } from '@users/models';

import {
  LoadSelf,
  LoadSelfFail,
  LoadSelfSuccess,
  Logout
} from '../actions/self.actions';
import { CoreState, reducers } from '../reducers';
import {
  getLoggedIn,
  getSelf,
  getSelfError,
  getSelfLoading,
  getSelfRole
} from './self.selectors';

describe('Self Selectors', () => {
  let store: Store<CoreState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSelfLoading', () => {
    it('should return true when LoadSelf was dispatched', () => {
      let result;

      store.select(getSelfLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new LoadSelf());
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

      store.select(getSelfLoading).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadSelfSuccess(payload));
      expect(result).toEqual(false);
    });
  });

  describe('getLoadSelfError', () => {
    it('should return error', () => {
      const loadUserError = {
        message: 'Error'
      };

      let result;

      store.select(getSelfError).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadSelfFail(loadUserError));
      expect(result).toEqual(loadUserError);
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

      store.select(getSelf).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadSelfSuccess(payload));
      expect(result).toEqual(payload);
    });

    it('should return null when logout was dispatched', () => {
      let result;

      store.select(getSelf).subscribe(value => {
        result = value;
      });

      store.dispatch(new Logout());
      expect(result).toEqual(null);
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

      store.select(getLoggedIn).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadSelfSuccess(payload));
      expect(result).toEqual(true);
    });

    it('should return false when logout was dispatched', () => {
      let result;

      store.select(getLoggedIn).subscribe(value => {
        result = value;
      });

      store.dispatch(new Logout());
      expect(result).toEqual(false);
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
      store.dispatch(new LoadSelfSuccess(payload));

      store.select(getSelfRole).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(payload.role);
    });
  });
});
