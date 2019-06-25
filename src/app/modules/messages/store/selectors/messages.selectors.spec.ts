import { TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { Message } from '../../models/message.model';
import {
  LoadMessages,
  LoadMessagesFail,
  LoadMessagesSuccess
} from '../actions/messages.actions';
import { messagesReducer, MessageState } from '../reducers';
import {
  getAllMessages,
  getMessageEntities,
  getMessagesError,
  getMessagesLoading,
  getUnreadMessages
} from './messages.selectors';

describe('Messages Selectors', () => {
  let store: Store<MessageState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            messages: messagesReducer
          },
          {
            runtimeChecks: {
              strictStateImmutability: false
            }
          }
        )
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getMessagesLoading', () => {
    it('should return true', () => {
      let result;

      store.select(getMessagesLoading).subscribe(value => {
        result = value;
      });

      expect(result).toEqual(false);
      store.dispatch(new LoadMessages());
      expect(result).toEqual(true);
    });

    it('should return false', () => {
      const messages: Message[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          forEmployee: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      let result;

      store.select(getMessagesLoading).subscribe(value => {
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

      store.select(getMessagesError).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesFail(error));
      expect(result).toEqual(error);
    });
  });

  describe('getMessageEntities', () => {
    it('should return message entities', () => {
      const messages: Message[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          forEmployee: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      const entities = {
        '1': messages[0]
      };

      let result;

      store.select(getMessageEntities).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(entities);
    });
  });

  describe('getUnreadMessages', () => {
    it('should return unread messages count', () => {
      const messages: Message[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          forEmployee: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      let result;

      store.select(getUnreadMessages).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(1);
    });
  });

  describe('getAllMessages', () => {
    it('should return all messages array', () => {
      const messages: Message[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          forEmployee: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      let result;

      store.select(getAllMessages).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess(messages));
      expect(result).toEqual(messages);
    });
  });
});
