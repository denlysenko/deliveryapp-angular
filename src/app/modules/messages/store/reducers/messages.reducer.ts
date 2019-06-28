import {
  MessagesActions,
  MessagesActionTypes
} from '../actions/messages.actions';
import { Message } from '../../models/message.model';

export interface MessageState {
  loading: boolean;
  error: any | null;
  entities: { [key: string]: Message };
  unread: number;
  totalCount: number;
}

export const initialState: MessageState = {
  loading: false,
  error: null,
  entities: {},
  unread: 0,
  totalCount: 0
};

export function messagesReducer(
  state = initialState,
  action: MessagesActions
): MessageState {
  switch (action.type) {
    case MessagesActionTypes.LOAD_MESSAGES: {
      return {
        ...state,
        loading: true
      };
    }

    case MessagesActionTypes.LOAD_MESSAGES_SUCCESS: {
      const { rows, count } = action.payload;
      let unread = state.unread;

      const entities = rows.reduce(
        (accumulator: { [id: string]: any }, message: Message) => {
          if (!message.read) {
            unread++;
          }

          return {
            ...accumulator,
            [message._id]: message
          };
        },
        { ...state.entities }
      );

      return {
        ...state,
        loading: false,
        entities,
        unread,
        totalCount: count
      };
    }

    case MessagesActionTypes.LOAD_MESSAGES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    case MessagesActionTypes.HANDLE_MESSAGE_RECEIVE: {
      const message = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [message._id]: message
        },
        unread: state.unread + 1,
        totalCount: state.totalCount + 1
      };
    }

    case MessagesActionTypes.MARK_AS_READ_SUCCESS: {
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
  }

  return state;
}

export const getMessagesLoading = (state: MessageState) => state.loading;
export const getMessagesError = (state: MessageState) => state.error;
export const getMessageEntities = (state: MessageState) => state.entities;
export const getUnreadMessages = (state: MessageState) => state.unread;
export const getMessagesCount = (state: MessageState) => state.totalCount;
