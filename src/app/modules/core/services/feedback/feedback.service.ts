import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { Feedback } from './Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService implements Feedback {
  constructor(private readonly messageService: MessageService) {}

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
