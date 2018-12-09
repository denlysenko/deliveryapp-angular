import { TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { LoadMessages, LoadMessagesFail, LoadMessagesSuccess } from '../actions/messages.actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from './messages.selectors';

// import { Message } from '../../../lib/messages/Message';

describe('Messages Selectors', () => {
  let store: Store<fromReducers.CoreState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(fromReducers.reducers)]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getMessagesLoading', () => {
    it('should return true', () => {
      let result;

      store.select(fromSelectors.getMessagesLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new LoadMessages());
      expect(result).toEqual(true);
    });

    it('should return false', () => {
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

      store.select(fromSelectors.getMessagesLoading).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(false);
    });
  });

  describe('getMessagesError', () => {
    it('should return error', () => {
      const error = {
        message: 'Error'
      };

      let result;

      store.select(fromSelectors.getMessagesError).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesFail(error));
      expect(result).toEqual(error);
    });
  });

  describe('getMessageEntities', () => {
    it('should return message entities', () => {
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

      const entities = {
        '1': messages[0]
      };

      let result;

      store.select(fromSelectors.getMessageEntities).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(entities);
    });
  });

  describe('getUnreadMessages', () => {
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

      store.select(fromSelectors.getUnreadMessages).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(1);
    });
  });

  describe('getAllMessages', () => {
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

      store.select(fromSelectors.getAllMessages).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(messages);
    });
  });
});