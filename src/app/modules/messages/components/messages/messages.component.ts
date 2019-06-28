import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DEFAULT_LIMIT } from '@common/constants';

import { Message } from '../../models';
import { MessagesFacade } from '../../store';

@Component({
  selector: 'da-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  @Input() count: number;
  @Input() messages: Message[] = [];

  constructor(private messagesFacade: MessagesFacade) {}

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
