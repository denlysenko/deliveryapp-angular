import { async, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { AuthForm, User } from '../models';
import { AuthFail, Login, Register } from './actions/auth.actions';
import { LoadSelfSuccess } from './actions/self.actions';
import { AuthFacade } from './auth.facade';
import * as fromAuth from './reducers';

const user: User = {
  id: 1,
  email: 'test@test.com',
  firstName: 'First Name',
  lastName: 'Last Name',
  company: 'Company',
  phone: '1(111) 111-11-11',
  role: 1
};

describe('AuthFacade', () => {
  let store: Store<fromAuth.AuthFeatureState>;
  let facade: AuthFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          auth: combineReducers(fromAuth.reducers)
        })
      ],
      providers: [AuthFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    facade = TestBed.get(AuthFacade);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('loading$', () => {
    it('should return current loading$', () => {
      let result;
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };

      facade.loading$.subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new Login(payload));
      expect(result).toEqual(true);
    });
  });

  describe('error$', () => {
    it('should return current error$', () => {
      let result;
      const payload: any = {
        message: 'error'
      };

      facade.error$.subscribe(value => {
        result = value;
      });

      expect(result).toEqual(null);
      store.dispatch(new AuthFail(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('loggedIn$', () => {
    it('should return current loggedIn$', () => {
      let result;

      facade.loggedIn$.subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new LoadSelfSuccess(user));
      expect(result).toEqual(true);
    });
  });

  describe('self$', () => {
    it('should return current self$', () => {
      let result;

      facade.self$.subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadSelfSuccess(user));
      expect(result).toEqual(user);
    });
  });

  describe('login()', () => {
    it('should dispatch a Login action', () => {
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new Login(payload);

      facade.login(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('register()', () => {
    it('should dispatch a Register action', () => {
      const payload: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };
      const action = new Register(payload);

      facade.register(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
