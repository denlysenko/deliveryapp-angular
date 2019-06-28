import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Message } from '../models';
import {
  HandleMessageReceive,
  LoadMessages,
  MarkAsRead,
  SubscribeToMessages,
  LoadMore
} from './actions';
import { MessageState } from './reducers';
import {
  getAllMessages,
  getUnreadMessages,
  getMessagesCount
} from './selectors';

@Injectable()
export class MessagesFacade {
  unreadMessages$ = this.store.pipe(select(getUnreadMessages));
  messages$ = this.store.pipe(select(getAllMessages));
  totalCount$ = this.store.pipe(select(getMessagesCount));

  constructor(private store: Store<MessageState>) {}

  loadMessages() {
    this.store.dispatch(new LoadMessages());
  }

  loadMore(offset: number) {
    this.store.dispatch(new LoadMore(offset));
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
