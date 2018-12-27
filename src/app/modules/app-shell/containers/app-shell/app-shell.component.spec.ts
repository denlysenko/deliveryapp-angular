import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { User } from '@auth/models';
import { CoreFacade } from '@core/store';

import { AppShellComponent } from './app-shell.component';

const USER: User = {
  id: 1,
  email: 'test@test.com',
  firstName: 'First Name',
  lastName: 'Last Name',
  company: 'Company',
  phone: '1(111) 111-11-11',
  role: 1
};

// TODO add Message type
const MESSAGES: any[] = [
  {
    _id: '1',
    text: 'message',
    read: false,
    recipientId: null,
    createdAt: new Date().toISOString()
  }
];

const UNREAD_MESSAGES = 3;

const coreFacadeStub = {
  self$: of(USER),
  unreadMessages$: of(UNREAD_MESSAGES),
  messages$: of(MESSAGES),
  markMessageAsRead: jasmine.createSpy('markMessageAsRead'),
  logout: jasmine.createSpy('logout')
};

describe('AppShellComponent', () => {
  let component: AppShellComponent;
  let fixture: ComponentFixture<AppShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppShellComponent],
      providers: [
        {
          provide: CoreFacade,
          useValue: coreFacadeStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have `user$` defined', () => {
    let result;
    expect(component.user$).toBeDefined();
    component.user$.subscribe(user => {
      result = user;
    });
    expect(result).toEqual(USER);
  });

  it('should have `unreadMessages$` defined', () => {
    let result;
    expect(component.unreadMessages$).toBeDefined();
    component.unreadMessages$.subscribe(msg => {
      result = msg;
    });
    expect(result).toEqual(UNREAD_MESSAGES);
  });

  it('should have `messages$` defined', () => {
    let result;
    expect(component.messages$).toBeDefined();
    component.messages$.subscribe(msg => {
      result = msg;
    });
    expect(result).toEqual(MESSAGES);
  });

  it('should have `showMessages = false` by default', () => {
    expect(component.showMessages).toBeFalsy();
  });

  describe('markMessageAsRead()', () => {
    it('should call CoreFacade.markMessageAsRead', () => {
      const coreFacade = TestBed.get(CoreFacade);
      const ID = '1';
      component.markMessageAsRead(ID);
      expect(coreFacade.markMessageAsRead).toBeCalledWith(ID);
    });
  });

  describe('logout()', () => {
    it('should call CoreFacade.logout', () => {
      const coreFacade = TestBed.get(CoreFacade);
      component.logout();
      expect(coreFacade.logout).toBeCalled();
    });
  });
});
