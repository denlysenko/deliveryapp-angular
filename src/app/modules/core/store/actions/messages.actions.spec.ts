import {
  HandleMessageReceive,
  LoadMessages,
  LoadMessagesFail,
  LoadMessagesSuccess,
  MarkAsRead,
  MarkAsReadFail,
  MarkAsReadSuccess,
  MessagesActionTypes,
  ResetMessagesState,
} from './messages.actions';

// import { Message } from '../../../lib/messages/Message';

describe('Messages Actions', () => {
  describe('LoadMessages', () => {
    it('should create an action', () => {
      const action = new LoadMessages();
      expect({ ...action }).toEqual({
        type: MessagesActionTypes.LOAD_MESSAGES
      });
    });
  });

  describe('LoadMessagesSuccess', () => {
    it('should create an action', () => {
      // TODO add Message model
      const payload: any[] = [
        {
          _id: '1',
          text: 'message',
          read: false,
          recipientId: null,
          createdAt: new Date().toISOString()
        }
      ];

      const action = new LoadMessagesSuccess(payload);
      expect({ ...action }).toEqual({
        type: MessagesActionTypes.LOAD_MESSAGES_SUCCESS,
        payload
      });
    });
  });

  describe('LoadMessagesFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' };
      const action = new LoadMessagesFail(payload);
      expect({ ...action }).toEqual({
        type: MessagesActionTypes.LOAD_MESSAGES_FAIL,
        payload
      });
    });
  });

  describe('MarkAsRead', () => {
    it('should create an action', () => {
      const payload = '1';
      const action = new MarkAsRead(payload);
      expect({ ...action }).toEqual({
        type: MessagesActionTypes.MARK_AS_READ,
        payload
      });
    });
  });

  describe('MarkAsReadSuccess', () => {
    it('should create an action', () => {
      const payload = '1';
      const action = new MarkAsReadSuccess(payload);
      expect({ ...action }).toEqual({
        type: MessagesActionTypes.MARK_AS_READ_SUCCESS,
        payload
      });
    });
  });

  describe('MarkAsReadFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' };
      const action = new MarkAsReadFail(payload);
      expect({ ...action }).toEqual({
        type: MessagesActionTypes.MARK_AS_READ_FAIL,
        payload
      });
    });
  });

  describe('HandleMessageReceive', () => {
    it('should create an action', () => {
      // TODO add Message model
      const payload: any = {
        _id: '1',
        text: 'message',
        read: false,
        recipientId: null,
        createdAt: new Date().toISOString()
      };

      const action = new HandleMessageReceive(payload);
      expect({ ...action }).toEqual({
        type: MessagesActionTypes.HANDLE_MESSAGE_RECEIVE,
        payload
      });
    });
  });

  describe('ResetMessagesState', () => {
    it('should create an action', () => {
      const action = new ResetMessagesState();
      expect({ ...action }).toEqual({
        type: MessagesActionTypes.RESET_MESSAGES_STATE
      });
    });
  });
});
