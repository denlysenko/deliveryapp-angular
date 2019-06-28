import { async, TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { User } from '@users/models';

import { RouterPayload } from '../models/router-payload.model';

import { Back, Forward, Go } from './actions/router.actions';
import { LoadSelf, LoadSelfSuccess, Logout } from './actions/self.actions';
import { CoreFacade } from './core.facade';
import { CoreState, reducers } from './reducers';

// tslint:disable-next-line:no-big-function
describe('CoreFacade', () => {
  let store: Store<CoreState>;
  let facade: CoreFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: false
          }
        })
      ],
      providers: [CoreFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    facade = TestBed.get(CoreFacade);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('loggedIn$', () => {
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

      facade.loggedIn$.subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadSelfSuccess(payload));
      expect(result).toEqual(true);
    });

    it('should return false when logout was dispatched', () => {
      let result;

      facade.loggedIn$.subscribe(value => {
        result = value;
      });

      store.dispatch(new Logout());
      expect(result).toEqual(false);
    });
  });

  describe('self$', () => {
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

      facade.self$.subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadSelfSuccess(payload));
      expect(result).toEqual(payload);
    });
  });

  describe('loadSelf()', () => {
    it('should dispatch a LoadSelf action', () => {
      const action = new LoadSelf();

      facade.loadSelf();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('updateSelf()', () => {
    it('should dispatch a LoadSelfSuccess action', () => {
      const payload: User = {
        id: 1,
        email: 'test@test.com',
        firstName: 'First Name',
        lastName: 'Last Name',
        company: 'Company',
        phone: '1(111) 111-11-11',
        role: 1
      };
      const action = new LoadSelfSuccess(payload);

      facade.updateSelf(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('navigate()', () => {
    it('should dispatch a Go action', () => {
      const payload: RouterPayload = {
        path: ['test']
      };
      const action = new Go(payload);

      facade.navigate(payload);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('navigateBack()', () => {
    it('should dispatch a Back action', () => {
      const action = new Back();

      facade.navigateBack();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('navigateForward()', () => {
    it('should dispatch a Forward action', () => {
      const action = new Forward();

      facade.navigateForward();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('logout()', () => {
    it('should dispatch a Logout action', () => {
      const action = new Logout();

      facade.logout();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
