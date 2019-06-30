import { Injectable } from '@angular/core';

import { FeedbackService } from '@core/services';
import { ApiService } from '@core/services/api.service';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { environment } from '~/environments/environment';

import { BaseMessagesService } from '../base/BaseMessagesService';
import { MessagesFacade } from '../store';

@Injectable()
export class MessagesService extends BaseMessagesService {
  protected readonly firebaseConfig = {
    messagingSenderId: environment.firebaseSenderId,
    appId: environment.firebaseAppId
  };

  private messaging: firebase.messaging.Messaging;
  private unsubscribe: firebase.Unsubscribe;

  constructor(
    feedbackService: FeedbackService,
    apiService: ApiService,
    messagesFacade: MessagesFacade
  ) {
    super(feedbackService, apiService, messagesFacade);
  }

  init() {
    firebase.initializeApp(this.firebaseConfig);
    this.messaging = firebase.messaging();
    this.messaging.usePublicVapidKey(environment.firebasePublicKey);
    // set onMessage handler after reload and previously was logged
    this.unsubscribe = this.messaging.onMessage(this.onMessage.bind(this));
  }

  protected async requestPermissions() {
    try {
      await this.messaging.requestPermission();
    } catch (err) {}
  }

  protected async getToken(): Promise<string | undefined> {
    let token;

    try {
      token = await this.messaging.getToken();
    } catch (err) {}

    return token;
  }

  protected async registerForNotifications() {
    this.unsubscribe = this.messaging.onMessage(this.onMessage.bind(this));
  }

  protected async unregisterFromNotifications(token: string) {
    await this.messaging.deleteToken(token);

    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
