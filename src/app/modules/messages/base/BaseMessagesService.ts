import { BaseFilter, ListResponse } from '@common/models';

import { FeedbackService } from '@core/services';
import { ApiService } from '@core/services/api.service';

import { Observable } from 'rxjs';

import { MessagePayload } from '../models/message-payload.model';
import { Message } from '../models/message.model';
import { MessagesFacade } from '../store';

export abstract class BaseMessagesService {
  protected abstract readonly firebaseConfig: any;

  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly apiService: ApiService,
    private readonly messagesFacade: MessagesFacade
  ) {}

  abstract init(): void;

  loadMessages(query: BaseFilter): Observable<ListResponse<Message>> {
    return this.apiService.get('/messages', query);
  }

  markAsRead(id: string): Observable<void> {
    return this.apiService.patch(`/messages/${id}`, {});
  }

  async subscribeToMessaging() {
    if (this.requestPermissions) {
      await this.requestPermissions();
    }

    const token = await this.getToken();

    if (token) {
      try {
        await this.apiService
          .post('/messages/subscribe', { socketId: token })
          .toPromise();

        await this.registerForNotifications();
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

        await this.unregisterFromNotifications(token);
      } catch (err) {}
    }
  }

  protected requestPermissions?(): Promise<void>;

  protected abstract getToken(): Promise<string | undefined>;
  protected abstract registerForNotifications(): Promise<void>;
  protected abstract unregisterFromNotifications(token: string): Promise<void>;

  protected onMessage(payload: MessagePayload) {
    const {
      _id,
      recipientId,
      text,
      createdAt,
      forEmployee,
      read
    } = payload.data;

    this.feedbackService.info(text);
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
