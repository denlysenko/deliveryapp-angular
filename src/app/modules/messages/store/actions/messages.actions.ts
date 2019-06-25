import { Action } from '@ngrx/store';
import { Message } from '../../models/message.model';

export enum MessagesActionTypes {
  LOAD_MESSAGES = '[Messages] Load Messages',
  LOAD_MESSAGES_SUCCESS = '[Messages] Load Messages Success',
  LOAD_MESSAGES_FAIL = '[Messages] Load Messages Fail',
  MARK_AS_READ = '[Messages] Mark Message As Read',
  MARK_AS_READ_SUCCESS = '[Messages] Mark Message As Read Success',
  MARK_AS_READ_FAIL = '[Messages] Mark Message As Read Fail',
  HANDLE_MESSAGE_RECEIVE = '[Messages] Handle Message Receive',
  SUBSCRIBE_TO_MESSAGES = '[Messages] Subscribe To Messages',
  UNSUBSCRIBE_FROM_MESSAGES = '[Messages] Unsubscribe From Messages'
}

export class LoadMessages implements Action {
  readonly type = MessagesActionTypes.LOAD_MESSAGES;
}

export class LoadMessagesSuccess implements Action {
  readonly type = MessagesActionTypes.LOAD_MESSAGES_SUCCESS;

  constructor(public payload: Message[]) {}
}

export class LoadMessagesFail implements Action {
  readonly type = MessagesActionTypes.LOAD_MESSAGES_FAIL;

  constructor(public payload: any) {}
}

export class MarkAsRead implements Action {
  readonly type = MessagesActionTypes.MARK_AS_READ;

  constructor(public payload: string) {}
}

export class MarkAsReadSuccess implements Action {
  readonly type = MessagesActionTypes.MARK_AS_READ_SUCCESS;

  constructor(public payload: string) {}
}

export class MarkAsReadFail implements Action {
  readonly type = MessagesActionTypes.MARK_AS_READ_FAIL;

  constructor(public payload: any) {}
}

export class HandleMessageReceive implements Action {
  readonly type = MessagesActionTypes.HANDLE_MESSAGE_RECEIVE;

  constructor(public payload: Message) {}
}

export class SubscribeToMessages implements Action {
  readonly type = MessagesActionTypes.SUBSCRIBE_TO_MESSAGES;
}

export class UnsubscribeFromMessages implements Action {
  readonly type = MessagesActionTypes.UNSUBSCRIBE_FROM_MESSAGES;
}

export type MessagesActions =
  | LoadMessages
  | LoadMessagesSuccess
  | LoadMessagesFail
  | MarkAsRead
  | MarkAsReadSuccess
  | MarkAsReadFail
  | HandleMessageReceive
  | SubscribeToMessages
  | UnsubscribeFromMessages;
