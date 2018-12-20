import { Component } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messages$ = this.params.context.messages$;

  constructor(private params: ModalDialogParams) {}

  close() {
    this.params.closeCallback(null);
  }
}
