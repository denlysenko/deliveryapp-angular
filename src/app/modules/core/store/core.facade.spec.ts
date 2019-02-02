import { async, TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { User } from '@auth/models';

import { RouterPayload } from '../models/router-payload.model';
import {
  LoadMessages,
  LoadMessagesSuccess,
  MarkAsRead
} from './actions/messages.actions';
import { Back, Forward, Go } from './actions/router.actions';
import { LoadSelf, LoadSelfSuccess, Logout } from './actions/self.actions';
import { CoreFacade } from './core.facade';
import { CoreState, reducers } from './reducers';

describe('CoreFacade', () => {
  let store: Store<CoreState>;
  let facade: CoreFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
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

  describe('unreadMessages$', () => {
    it('should return unread messages count', () => {
      // TODO add Message type
      const messages: any[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      let result;

      facade.unreadMessages$.subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(1);
    });
  });

  describe('messages$', () => {
    it('should return all messages array', () => {
      // TODO add Message type
      const messages: any[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      let result;

      facade.messages$.subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(messages);
    });
  });

  describe('loadSelf()', () => {
    it('should dispatch a LoadSelf action', () => {
      const action = new LoadSelf();

      facade.loadSelf();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('loadMessages()', () => {
    it('should dispatch a LoadMessages action', () => {
      const action = new LoadMessages();

      facade.loadMessages();
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

  describe('markMessageAsRead', () => {
    it('should dispatch MarkAsRead action', () => {
      const payload = '1';
      const action = new MarkAsRead(payload);
      facade.markMessageAsRead(payload);
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
