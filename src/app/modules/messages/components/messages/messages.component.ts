import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Message } from '../../models';
import { MessagesFacade } from '../../store';

@Component({
  selector: 'da-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  @Input() messages: Message[] = [];

  constructor(private messagesFacade: MessagesFacade) {}

  markAsRead(id: string) {
    this.messagesFacade.markMessageAsRead(id);
  }
}
