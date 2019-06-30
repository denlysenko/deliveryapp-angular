import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { BaseMessagesComponent } from '../../base/BaseMessagesComponent';
import { MessagesFacade } from '../../store';

@Component({
  selector: 'da-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent extends BaseMessagesComponent implements OnInit {
  constructor(messagesFacade: MessagesFacade) {
    super(messagesFacade);
  }

  ngOnInit() {
    this.messagesFacade.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => (this.messages = messages));

    this.messagesFacade.totalCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => (this.count = count));
  }
}
