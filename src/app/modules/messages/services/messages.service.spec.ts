import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FeedbackService } from '@core/services';
import { ApiService } from '@core/services/api.service';

import firebase from 'firebase/app';

import { environment } from '~/environments/environment';

import { MessagesFacade } from '../store';
import { MessagesService } from './messages.service';

const token = 'token';

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
    messaging: jest.fn(() => {
      return {
        usePublicVapidKey: jest.fn(),
        getToken: jest.fn(() => Promise.resolve(token)),
        onMessage: jest.fn(),
        deleteToken: jest.fn(() => Promise.resolve(true))
      };
    })
  };
});

function MockNotification() {}
MockNotification.requestPermission = jest.fn().mockResolvedValue('granted');
(window as any).Notification = MockNotification;

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MessagesService,
        ApiService,
        {
          provide: FeedbackService,
          useValue: {
            info: jest.fn()
          }
        },
        {
          provide: MessagesFacade,
          useValue: {
            handleMessageReceive: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(MessagesService);
    service.init();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('subscribeToMessaging()', () => {
    beforeEach(() => {
      service.subscribeToMessaging();
    });

    it('should request permissions', () => {
      expect(window.Notification.requestPermission()).resolves.toEqual(
        'granted'
      );
    });

    it('should get token', () => {
      expect(firebase.messaging().getToken()).resolves.toEqual(token);
    });

    it('should send subscribe request', () => {
      const http = TestBed.inject(HttpTestingController);
      const payload = { socketId: token };

      const req = http.expectOne(`${environment.apiUrl}/messages/subscribe`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);

      req.flush(payload);
    });
  });

  describe('unsubscribeFromMessaging()', () => {
    beforeEach(() => {
      service.unsubscribeFromMessaging();
    });

    it('should get token', () => {
      expect(firebase.messaging().getToken()).resolves.toEqual(token);
    });

    it('should send unsubscribe request', () => {
      const http = TestBed.inject(HttpTestingController);
      const payload = { socketId: token };

      const req = http.expectOne(`${environment.apiUrl}/messages/unsubscribe`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);

      req.flush(payload);
    });

    it('should delete token', () => {
      expect(firebase.messaging().deleteToken(token)).resolves.toEqual(true);
    });
  });

  describe('markAsRead()', () => {
    it('should send request', () => {
      const http = TestBed.inject(HttpTestingController);
      const id = 'message_id';

      service.markAsRead(id).subscribe();

      const req = http.expectOne(`${environment.apiUrl}/messages/${id}`);
      expect(req.request.method).toBe('PATCH');

      req.flush({});
    });
  });
});
