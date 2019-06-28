import { createFeatureSelector } from '@ngrx/store';

import { MessageState } from './messages.reducer';

export { messagesReducer, MessageState } from './messages.reducer';
export const getMessagesState = createFeatureSelector<MessageState>('messages');
