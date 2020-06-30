import { async, TestBed } from '@angular/core/testing';

import { Store, StoreModule } from '@ngrx/store';

import { Message } from '../models';
import {
  HandleMessageReceive,
  LoadMessages,
  LoadMessagesSuccess,
  LoadMore,
  MarkAsRead,
  SubscribeToMessages
} from './actions';
import { MessagesFacade } from './messages.facade';
import { messagesReducer, MessageState } from './reducers';

// tslint:disable-next-line:no-big-function
describe('MessagesFacade', () => {
  let store: Store<MessageState>;
  let facade: MessagesFacade;

  beforeEach(async(() => {
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
      ],
      providers: [MessagesFacade]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    facade = TestBed.inject(MessagesFacade);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('unreadMessages$', () => {
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

      facade.unreadMessages$.subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess({ rows: messages, count: 1 }));
      expect(result).toEqual(1);
    });
  });

  describe('totalCount$', () => {
    it('should return messages count', () => {
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

      facade.totalCount$.subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess({ rows: messages, count: 1 }));
      expect(result).toEqual(1);
    });
  });

  describe('messages$', () => {
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

      facade.messages$.subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadMessagesSuccess({ rows: messages, count: 1 }));
      expect(result).toEqual(messages);
    });
  });

  describe('loadMessages()', () => {
    it('should dispatch a LoadMessages action', () => {
      const action = new LoadMessages();

      facade.loadMessages();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('loadMore()', () => {
    it('should dispatch a LoadMore action', () => {
      const action = new LoadMore(10);

      facade.loadMore(10);
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

  describe('handleMessageReceive', () => {
    it('should dispatch HandleMessageReceive action', () => {
      const message: Message = {
        _id: '1',
        text: 'message',
        read: false,
        forEmployee: false,
        recipientId: null,
        createdAt: new Date().toISOString()
      };
      const action = new HandleMessageReceive(message);
      facade.handleMessageReceive(message);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('subscribeToMessages', () => {
    it('should dispatch SubscribeToMessages action', () => {
      const action = new SubscribeToMessages();
      facade.subscribeToMessages();
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
