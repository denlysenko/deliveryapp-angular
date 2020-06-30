import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { MessagesFacade } from '../../store';
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MessagesFacade,
          useValue: {
            markMessageAsRead: jest.fn(),
            loadMore: jest.fn(),
            messages$: of([
              {
                _id: '1',
                text: 'message',
                read: false,
                forEmployee: false,
                recipientId: null,
                createdAt: new Date().toISOString()
              }
            ]),
            totalCount$: of(2)
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('markAsRead()', () => {
    it('should call facade service', () => {
      const facade: MessagesFacade = TestBed.inject(MessagesFacade);
      component.markAsRead('1');
      expect(facade.markMessageAsRead).toHaveBeenCalledWith('1');
    });
  });

  describe('loadMore()', () => {
    it('should call facade service', () => {
      const facade: MessagesFacade = TestBed.inject(MessagesFacade);
      component.loadMore();
      expect(facade.loadMore).toHaveBeenCalled();
    });
  });
});
