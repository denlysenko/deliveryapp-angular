import { inject, TestBed } from '@angular/core/testing';

import { MessageService } from 'primeng/api';

import { FeedbackService } from './feedback.service';

const messageServiceStub = {
  add: jasmine.createSpy('add')
};

const SUCCESS_MESSAGE = 'success';
const ERROR_MESSAGE = 'error';
const INFO_MESSAGE = 'info';

describe('[Web] Feedback Service', () => {
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedbackService,
        {
          provide: MessageService,
          useValue: messageServiceStub
        }
      ]
    });
  });

  beforeEach(() => {
    messageService = TestBed.inject(MessageService);
  });

  describe('success()', () => {
    it('should call MessageService.add()', inject(
      [FeedbackService],
      (service: FeedbackService) => {
        service.success(SUCCESS_MESSAGE);
        expect(messageService.add).toBeCalledWith({
          severity: 'success',
          summary: 'Success',
          detail: SUCCESS_MESSAGE
        });
      }
    ));
  });

  describe('error()', () => {
    it('should call MessageService.add()', inject(
      [FeedbackService],
      (service: FeedbackService) => {
        service.error(ERROR_MESSAGE);
        expect(messageService.add).toBeCalledWith({
          severity: 'error',
          summary: 'Error',
          detail: ERROR_MESSAGE
        });
      }
    ));
  });

  describe('info()', () => {
    it('should call MessageService.add()', inject(
      [FeedbackService],
      (service: FeedbackService) => {
        service.info(INFO_MESSAGE);
        expect(messageService.add).toBeCalledWith({
          severity: 'info',
          summary: 'Info',
          detail: INFO_MESSAGE
        });
      }
    ));
  });
});
