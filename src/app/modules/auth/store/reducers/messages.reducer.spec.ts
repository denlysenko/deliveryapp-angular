import * as fromActions from '../actions/messages.actions';
import * as fromMessages from './messages.reducer';

// import { Message } from '../../../lib/messages/Message';

describe('MessagesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromMessages;
      const action = {} as any;
      const state = fromMessages.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_MESSAGES action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromMessages;
      const action = new fromActions.LoadMessages();
      const state = fromMessages.reducer(initialState, action);
      expect(state.loading).toEqual(true);
    });
  });

  describe('LOAD_MESSAGES_SUCCESS action', () => {
    it('should map an array to entities and calculate unread number', () => {
      // TODO add Message model
      const messages: any[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          text: 'message',
          read: true,
          recipientId: null,
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          text: 'message',
          read: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      const entities = {
        '1': messages[0],
        '2': messages[1],
        '3': messages[2]
      };

      const { initialState } = fromMessages;
      const action = new fromActions.LoadMessagesSuccess(messages);
      const state = fromMessages.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
      expect(state.unread).toEqual(2);
    });
  });

  describe('LOAD_MESSAGES_FAIL action', () => {
    it('should set error', () => {
      const error = { message: 'Error message' };

      const { initialState } = fromMessages;
      const action = new fromActions.LoadMessagesFail(error);
      const state = fromMessages.reducer(initialState, action);
      expect(state.loading).toEqual(false);
      expect(state.error).toEqual(error);
    });
  });

  describe('HANDLE_MESSAGE_RECEIVE action', () => {
    it('should set add new message', () => {
      // TODO add Message model
      const message: any = {
        _id: '1',
        text: 'message',
        read: false,
        recipientId: null,
        createdAt: new Date().toISOString()
      };

      const { initialState } = fromMessages;
      const action = new fromActions.HandleMessageReceive(message);
      const state = fromMessages.reducer(initialState, action);
      expect(state.entities['1']).toEqual(message);
      expect(state.unread).toEqual(1);
    });
  });

  describe('MARK_AS_READ_SUCCESS action', () => {
    it('should mark message as read and decrease unread count', () => {
      // TODO add Message model
      const messages: any[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      const { initialState } = fromMessages;
      const loadAction = new fromActions.LoadMessagesSuccess(messages);
      const state = fromMessages.reducer(initialState, loadAction);
      const markAsReadAction = new fromActions.MarkAsReadSuccess('1');
      const updatedState = fromMessages.reducer(state, markAsReadAction);
      expect(updatedState.entities['1'].read).toEqual(true);
      expect(updatedState.unread).toEqual(0);
    });
  });

  describe('RESET_MESSAGES_STATE action', () => {
    it('should set state to initialState', () => {
      const { initialState } = fromMessages;
      const action = new fromActions.ResetMessagesState();
      const state = fromMessages.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
