import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/primeng';

import { Feedback } from './Feedback';

@Injectable()
export class FeedbackService implements Feedback {
  constructor(private messageService: MessageService) {}

  success(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message
    });
  }

  error(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  info(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message
    });
  }
}
