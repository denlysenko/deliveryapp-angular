import { Injectable } from '@angular/core';

import { FeedbackService } from '@core/services';
import { ApiService } from '@core/services/api.service';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { Observable } from 'rxjs';

import { environment } from '~/environments/environment';

import { MessagePayload } from '../models/message-payload.model';
import { Message } from '../models/message.model';
import { MessagesFacade } from '../store';

@Injectable()
export class MessagesService {
  private messaging: firebase.messaging.Messaging;
  private unsubscribe: firebase.Unsubscribe;

  constructor(
    private feedbackService: FeedbackService,
    private apiService: ApiService,
    private messagesFacade: MessagesFacade
  ) {}

  init() {
    const firebaseConfig = {
      messagingSenderId: environment.firebaseSenderId,
      appId: environment.firebaseAppId
    };

    firebase.initializeApp(firebaseConfig);
    this.messaging = firebase.messaging();
    this.messaging.usePublicVapidKey(environment.firebasePublicKey);
    // set onMessage handler after reload and previously was logged
    this.unsubscribe = this.messaging.onMessage(this.onMessage.bind(this));
  }

  async subscribeToMessaging() {
    await this.requestPermissions();

    const token = await this.getToken();

    if (token) {
      try {
        await this.apiService
          .post('/messages/subscribe', { socketId: token })
          .toPromise();
        // set onMessage handler after login
        this.unsubscribe = this.messaging.onMessage(this.onMessage.bind(this));
      } catch (err) {}
    }
  }

  async unsubscribeFromMessaging() {
    const token = await this.getToken();

    if (token) {
      try {
        await this.apiService
          .post('/messages/unsubscribe', { socketId: token })
          .toPromise();

        await this.messaging.deleteToken(token);

        if (this.unsubscribe) {
          this.unsubscribe();
        }
      } catch (err) {}
    }
  }

  markAsRead(id: string): Observable<Message> {
    return this.apiService.patch(`/messages/${id}`, {});
  }

  private async requestPermissions() {
    try {
      await this.messaging.requestPermission();
    } catch (err) {}
  }

  private async getToken(): Promise<string | undefined> {
    let token;

    try {
      token = await this.messaging.getToken();
    } catch (err) {}

    return token;
  }

  private onMessage(payload: MessagePayload) {
    const {
      _id,
      recipientId,
      text,
      createdAt,
      forEmployee,
      read
    } = payload.data;

    this.feedbackService.info(payload.notification.body);
    this.messagesFacade.handleMessageReceive({
      _id,
      recipientId: parseInt(recipientId, 10),
      text,
      createdAt,
      forEmployee: forEmployee === 'true',
      read: read === 'true'
    });
  }
}
