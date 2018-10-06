import * as fromMessages from '../actions/messages.actions';

// import { Message } from '../../../lib/messages/Message';

export interface MessageState {
  loading: boolean;
  error: any | null;
  // TODO add Message model
  entities: { [key: string]: any };
  unread: number;
}

export const initialState: MessageState = {
  loading: false,
  error: null,
  entities: {},
  unread: 0
};

export function reducer(
  state = initialState,
  action: fromMessages.MessagesActions
): MessageState {
  switch (action.type) {
    case fromMessages.LOAD_MESSAGES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromMessages.LOAD_MESSAGES_SUCCESS: {
      const messages = action.payload;
      let unread = state.unread;

      const entities = messages.reduce(
        // TODO add Message model
        (accumulator: { [id: string]: any }, message: any) => {
          if (!message.read) {
            unread++;
          }

          return {
            ...accumulator,
            [message._id]: message
          };
        },
        {}
      );

      return {
        ...state,
        loading: false,
        entities,
        unread
      };
    }

    case fromMessages.LOAD_MESSAGES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case fromMessages.HANDLE_MESSAGE_RECEIVE: {
      const message = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [message._id]: message
        },
        unread: state.unread + 1
      };
    }

    case fromMessages.MARK_AS_READ_SUCCESS: {
      const messageId = action.payload;
      const updatedMessage = state.entities[messageId];
      updatedMessage.read = true;

      return {
        ...state,
        entities: {
          ...state.entities,
          [messageId]: updatedMessage
        },
        unread: state.unread - 1
      };
    }

    case fromMessages.RESET_MESSAGES_STATE: {
      return {
        ...state,
        ...initialState
      };
    }
  }

  return state;
}

export const getMessagesLoading = (state: MessageState) => state.loading;
export const getMessagesError = (state: MessageState) => state.error;
export const getMessageEntities = (state: MessageState) => state.entities;
export const getUnreadMessages = (state: MessageState) => state.unread;
