import { Action } from '@ngrx/store';

// import { Message } from '../../../lib/messages/Message';

export enum MessagesActionTypes {
  LOAD_MESSAGES = '[Core] Load Messages',
  LOAD_MESSAGES_SUCCESS = '[Core] Load Messages Success',
  LOAD_MESSAGES_FAIL = '[Core] Load Messages Fail',
  MARK_AS_READ = '[Core] Mark Message As Read',
  MARK_AS_READ_SUCCESS = '[Core] Mark Message As Read Success',
  MARK_AS_READ_FAIL = '[Core] Mark Message As Read Fail',
  HANDLE_MESSAGE_RECEIVE = '[Core] Handle Message Receive'
}

export class LoadMessages implements Action {
  readonly type = MessagesActionTypes.LOAD_MESSAGES;
}

export class LoadMessagesSuccess implements Action {
  readonly type = MessagesActionTypes.LOAD_MESSAGES_SUCCESS;

  // TODO add Message model
  constructor(public payload: any[]) {}
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

  // TODO add Message model
  constructor(public payload: any) {}
}

export type MessagesActions =
  | LoadMessages
  | LoadMessagesSuccess
  | LoadMessagesFail
  | MarkAsRead
  | MarkAsReadSuccess
  | MarkAsReadFail
  | HandleMessageReceive;
