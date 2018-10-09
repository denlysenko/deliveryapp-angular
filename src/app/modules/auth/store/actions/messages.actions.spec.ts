import * as fromMessages from './messages.actions';

// import { Message } from '../../../lib/messages/Message';

describe('Messages Actions', () => {
  describe('LoadMessages', () => {
    it('should create an action', () => {
      const action = new fromMessages.LoadMessages();
      expect({ ...action }).toEqual({
        type: fromMessages.LOAD_MESSAGES
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

      const action = new fromMessages.LoadMessagesSuccess(payload);
      expect({ ...action }).toEqual({
        type: fromMessages.LOAD_MESSAGES_SUCCESS,
        payload: payload
      });
    });
  });

  describe('LoadMessagesFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' };
      const action = new fromMessages.LoadMessagesFail(payload);
      expect({ ...action }).toEqual({
        type: fromMessages.LOAD_MESSAGES_FAIL,
        payload: payload
      });
    });
  });

  describe('MarkAsRead', () => {
    it('should create an action', () => {
      const payload = '1';
      const action = new fromMessages.MarkAsRead(payload);
      expect({ ...action }).toEqual({
        type: fromMessages.MARK_AS_READ,
        payload: payload
      });
    });
  });

  describe('MarkAsReadSuccess', () => {
    it('should create an action', () => {
      const payload = '1';
      const action = new fromMessages.MarkAsReadSuccess(payload);
      expect({ ...action }).toEqual({
        type: fromMessages.MARK_AS_READ_SUCCESS,
        payload: payload
      });
    });
  });

  describe('MarkAsReadFail', () => {
    it('should create an action', () => {
      const payload = { message: 'Error message' };
      const action = new fromMessages.MarkAsReadFail(payload);
      expect({ ...action }).toEqual({
        type: fromMessages.MARK_AS_READ_FAIL,
        payload: payload
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

      const action = new fromMessages.HandleMessageReceive(payload);
      expect({ ...action }).toEqual({
        type: fromMessages.HANDLE_MESSAGE_RECEIVE,
        payload: payload
      });
    });
  });

  describe('ResetMessagesState', () => {
    it('should create an action', () => {
      const action = new fromMessages.ResetMessagesState();
      expect({ ...action }).toEqual({
        type: fromMessages.RESET_MESSAGES_STATE
      });
    });
  });
});
