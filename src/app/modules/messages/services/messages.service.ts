import { Injectable } from '@angular/core';

import { FeedbackService } from '@core/services';
import { ApiService } from '@core/services/api.service';

import * as firebase from 'firebase/app';
import 'firebase/messaging';

import { MessagePayload } from '../models/message-payload.model';
import { environment } from '~/environments/environment';

const ERROR = "You won't be able to receive push messages!";

@Injectable()
export class MessagesService {
  private messaging: firebase.messaging.Messaging;
  private unsubscribe: firebase.Unsubscribe;

  constructor(
    private feedbackService: FeedbackService,
    private apiService: ApiService
  ) {}

  init() {
    const firebaseConfig = {
      messagingSenderId: environment.firebaseSenderId,
      appId: environment.firebaseAppId
    };

    firebase.initializeApp(firebaseConfig);
    this.messaging = firebase.messaging();
    this.messaging.usePublicVapidKey(
      'BN6Wwlj7GMtvzbRu99ZHTm3LnOV2pocLbh1gXVXR7TmTens_7tY7g0RbY-wXe_RSu7UsZxZ4krTvu78u0V4jQhc'
    );
  }

  async requestPermissions() {
    try {
      await this.messaging.requestPermission();
    } catch (err) {
      this.feedbackService.error(ERROR);
    }
  }

  async getToken(): Promise<string | undefined> {
    let token;

    try {
      token = await this.messaging.getToken();
    } catch (err) {
      console.error(err);
    }

    return token;
  }

  async subscribeToMessaging() {
    const token = await this.getToken();

    if (token) {
      this.apiService
        .post('/messages/subscribe', { socketId: token })
        .subscribe(() => {
          this.unsubscribe = this.messaging.onMessage(
            (payload: MessagePayload) => {
              // TODO: update messages array
              this.feedbackService.info(payload.notification.body);
            }
          );
        });
    }
  }

  async unsubscribeFromMessaging() {
    const token = await this.getToken();

    if (token) {
      this.apiService
        .post('/messages/unsubscribe', { socketId: token })
        .subscribe(() => {
          if (this.unsubscribe) {
            this.unsubscribe();
          }
        });
    }
  }

  markAsRead(id: string) {
    return this.apiService.patch(`/messages/${id}`, {});
  }
}
