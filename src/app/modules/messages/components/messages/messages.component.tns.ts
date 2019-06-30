import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

import { takeUntil } from 'rxjs/operators';

import { BaseMessagesComponent } from '../../base/BaseMessagesComponent';
import { MessagesFacade } from '../../store';

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent extends BaseMessagesComponent implements OnInit {
  constructor(
    messagesFacade: MessagesFacade,
    private params: ModalDialogParams,
    private cdr: ChangeDetectorRef
  ) {
    super(messagesFacade);
  }

  ngOnInit() {
    this.messagesFacade.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        // in some cases, when message is received via push,
        // list view is not updating. forcing this update by this call
        this.cdr.detectChanges();
      });

    this.messagesFacade.totalCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe(count => (this.count = count));
  }

  close() {
    this.params.closeCallback(null);
  }
}
