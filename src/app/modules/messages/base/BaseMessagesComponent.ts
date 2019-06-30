import { BaseComponent } from '@base/BaseComponent';

import { DEFAULT_LIMIT } from '@common/constants';

import { Message } from '../models';
import { MessagesFacade } from '../store';

export abstract class BaseMessagesComponent extends BaseComponent {
  count: number;
  messages: Message[] = [];

  constructor(protected messagesFacade: MessagesFacade) {
    super();
  }

  private offset = 0;

  markAsRead(id: string) {
    this.messagesFacade.markMessageAsRead(id);
  }

  loadMore() {
    if (this.messages.length >= this.count) {
      return;
    }

    this.offset += DEFAULT_LIMIT;
    this.messagesFacade.loadMore(this.offset);
  }
}
