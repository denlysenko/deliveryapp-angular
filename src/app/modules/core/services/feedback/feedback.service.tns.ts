import { Injectable } from '@angular/core';

import { Feedback as TNSFeedback } from 'nativescript-feedback';

import { Feedback } from './Feedback';

@Injectable()
export class FeedbackService implements Feedback {
  private feedback: TNSFeedback;

  constructor() {
    this.feedback = new TNSFeedback();
  }

  success(message: string) {
    this.feedback.success({
      title: 'Success',
      message
    });
  }

  error(message: string) {
    this.feedback.error({
      title: 'Error',
      message
    });
  }

  info(message: string) {
    this.feedback.info({
      title: 'Info',
      message
    });
  }
}
