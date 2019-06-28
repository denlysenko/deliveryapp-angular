import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
            markMessageAsRead: jest.fn()
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
      const facade: MessagesFacade = TestBed.get(MessagesFacade);
      component.markAsRead('1');
      expect(facade.markMessageAsRead).toHaveBeenCalledWith('1');
    });
  });
});
