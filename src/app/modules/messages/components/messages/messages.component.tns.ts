import { ChangeDetectorRef, Component } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

import { BaseMessagesComponent } from '../../base/BaseMessagesComponent';
import { MessagesFacade } from '../../store';

@Component({
  templateUrl: './messages.component.tns.html',
  styleUrls: ['./messages.component.tns.scss']
})
export class MessagesComponent extends BaseMessagesComponent {
  constructor(
    messagesFacade: MessagesFacade,
    private params: ModalDialogParams
  ) {
    super(messagesFacade);
  }

  close() {
    this.params.closeCallback(null);
  }
}
