import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BaseMessagesComponent } from '../../base/BaseMessagesComponent';
import { MessagesFacade } from '../../store';

@Component({
  selector: 'da-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent extends BaseMessagesComponent {
  constructor(messagesFacade: MessagesFacade) {
    super(messagesFacade);
  }
}
