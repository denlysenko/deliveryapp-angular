import { async, TestBed } from '@angular/core/testing';

import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { AuthForm } from '../models';
import { AuthFail, Login, Register } from './actions/auth.actions';
import { AuthFacade } from './auth.facade';
import * as fromAuth from './reducers';

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
      const payload = {
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
