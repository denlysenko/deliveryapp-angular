import { Injectable } from '@angular/core';

import { FeedbackService } from '@core/services';
import { ApiService } from '@core/services/api.service';

import { MessagesServiceBase } from '../base/MessagesServiceBase';
import { MessagesFacade } from '../store';

const firebase = require('nativescript-plugin-firebase');

@Injectable()
export class MessagesService extends MessagesServiceBase {
  protected readonly firebaseConfig = {
    onMessageReceivedCallback: this.onMessage.bind(this),
    showNotifications: false,
    showNotificationsWhenInForeground: true
  };

  constructor(
    feedbackService: FeedbackService,
    apiService: ApiService,
    messagesFacade: MessagesFacade
  ) {
    super(feedbackService, apiService, messagesFacade);
  }

  init() {
    firebase.init(this.firebaseConfig);
  }

  protected async getToken(): Promise<string | undefined> {
    let token;

    try {
      token = await firebase.getCurrentPushToken();
    } catch (err) {}

    return token;
  }

  protected async registerForNotifications() {
    return firebase.registerForPushNotifications(this.firebaseConfig);
  }

  protected async unregisterFromNotifications() {
    return firebase.unregisterForPushNotifications();
  }
}
