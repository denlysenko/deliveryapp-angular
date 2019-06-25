import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Message } from '../models';
import {
  HandleMessageReceive,
  LoadMessages,
  MarkAsRead,
  SubscribeToMessages
} from './actions';
import { MessageState } from './reducers';
import { getAllMessages, getUnreadMessages } from './selectors';

@Injectable()
export class MessagesFacade {
  unreadMessages$ = this.store.pipe(select(getUnreadMessages));
  messages$ = this.store.pipe(select(getAllMessages));

  constructor(private store: Store<MessageState>) {}

  loadMessages() {
    this.store.dispatch(new LoadMessages());
  }

  markMessageAsRead(id: string) {
    this.store.dispatch(new MarkAsRead(id));
  }

  handleMessageReceive(message: Message) {
    this.store.dispatch(new HandleMessageReceive(message));
  }

  subscribeToMessages() {
    this.store.dispatch(new SubscribeToMessages());
  }
}
