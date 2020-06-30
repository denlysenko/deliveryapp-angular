import { ChangeDetectorRef, OnInit, Directive } from '@angular/core';

import { BaseComponent } from '@base/BaseComponent';

import { DEFAULT_LIMIT } from '@common/constants';

import { takeUntil } from 'rxjs/operators';

import { Message } from '../models';
import { MessagesFacade } from '../store';

@Directive()
export abstract class BaseMessagesComponent extends BaseComponent
  implements OnInit {
  count: number;
  messages: Message[] = [];

  private offset = 0;

  constructor(
    protected messagesFacade: MessagesFacade,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.messagesFacade.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        this.cdr.detectChanges();
      });

    this.messagesFacade.totalCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => (this.count = count));
  }

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
