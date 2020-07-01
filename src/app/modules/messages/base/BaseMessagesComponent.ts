import { Directive } from '@angular/core';

import { DEFAULT_LIMIT } from '@common/constants';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Message } from '../models';
import { MessagesFacade } from '../store';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseMessagesComponent {
  messages$: Observable<Message[]> = this.messagesFacade.messages$.pipe(
    tap((messages) => (this.count = messages.length))
  );

  totalCount$: Observable<number> = this.messagesFacade.totalCount$.pipe(
    tap((totalCount) => (this.totalCount = totalCount))
  );

  private count: number;
  private totalCount: number;
  private offset = 0;

  constructor(protected readonly messagesFacade: MessagesFacade) {}

  markAsRead(id: string) {
    this.messagesFacade.markMessageAsRead(id);
  }

  loadMore() {
    if (this.count >= this.totalCount) {
      return;
    }

    this.offset += DEFAULT_LIMIT;
    this.messagesFacade.loadMore(this.offset);
  }
}
