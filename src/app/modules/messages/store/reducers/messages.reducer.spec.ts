import { Message } from '../../models/message.model';
import {
  HandleMessageReceive,
  LoadMessages,
  LoadMessagesFail,
  LoadMessagesSuccess,
  MarkAsReadSuccess
} from '../actions/messages.actions';
import { initialState, messagesReducer } from './messages.reducer';

describe('MessagesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = messagesReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_MESSAGES action', () => {
    it('should set loading to true', () => {
      const action = new LoadMessages();
      const { loading } = messagesReducer(initialState, action);
      expect(loading).toEqual(true);
    });
  });

  describe('LOAD_MESSAGES_SUCCESS action', () => {
    it('should map an array to entities and calculate unread number', () => {
      const messages: Message[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          forEmployee: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          text: 'message',
          read: true,
          forEmployee: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          text: 'message',
          read: false,
          forEmployee: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      const messageEntities = {
        '1': messages[0],
        '2': messages[1],
        '3': messages[2]
      };

      const action = new LoadMessagesSuccess({ rows: messages, count: 3 });
      const { loading, entities, unread } = messagesReducer(
        initialState,
        action
      );
      expect(loading).toEqual(false);
      expect(entities).toEqual(messageEntities);
      expect(unread).toEqual(2);
    });
  });

  describe('LOAD_MESSAGES_FAIL action', () => {
    it('should set error', () => {
      const payload = { message: 'Error message' };
      const action = new LoadMessagesFail(payload);
      const { loading, error } = messagesReducer(initialState, action);
      expect(loading).toEqual(false);
      expect(error).toEqual(error);
    });
  });

  describe('HANDLE_MESSAGE_RECEIVE action', () => {
    it('should set add new message', () => {
      const message: Message = {
        _id: '1',
        text: 'message',
        read: false,
        forEmployee: false,
        recipientId: null,
        createdAt: new Date().toISOString()
      };

      const action = new HandleMessageReceive(message);
      const { entities, unread, totalCount } = messagesReducer(
        initialState,
        action
      );
      expect(entities['1']).toEqual(message);
      expect(unread).toEqual(1);
      expect(totalCount).toEqual(1);
    });
  });

  describe('MARK_AS_READ_SUCCESS action', () => {
    it('should mark message as read and decrease unread count', () => {
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

      const loadAction = new LoadMessagesSuccess({ rows: messages, count: 1 });
      const state = messagesReducer(initialState, loadAction);
      const markAsReadAction = new MarkAsReadSuccess('1');
      const { entities, unread } = messagesReducer(state, markAsReadAction);
      expect(entities['1'].read).toEqual(true);
      expect(unread).toEqual(0);
    });
  });
});
