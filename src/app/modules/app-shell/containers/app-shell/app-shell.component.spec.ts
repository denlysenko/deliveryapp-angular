import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFacade } from '@core/store';

import { MessagesFacade } from '@messages/store';

import { User } from '@users/models';

import { of } from 'rxjs';

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

const UNREAD_MESSAGES = 3;

const coreFacadeStub = {
  self$: of(USER),
  logout: jasmine.createSpy('logout')
};

const messagesFacadeStub = {
  unreadMessages$: of(UNREAD_MESSAGES)
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
        },
        {
          provide: MessagesFacade,
          useValue: messagesFacadeStub
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
    let result: User;
    expect(component.user$).toBeDefined();
    component.user$.subscribe((user) => {
      result = user;
    });
    expect(result).toEqual(USER);
  });

  it('should have `unreadMessages$` defined', () => {
    let result: number;
    expect(component.unreadMessages$).toBeDefined();
    component.unreadMessages$.subscribe((msg) => {
      result = msg;
    });
    expect(result).toEqual(UNREAD_MESSAGES);
  });

  it('should have `showMessages = false` by default', () => {
    expect(component.showMessages).toBeFalsy();
  });

  describe('logout()', () => {
    it('should call CoreFacade.logout', () => {
      const coreFacade = TestBed.inject(CoreFacade);
      component.logout();
      expect(coreFacade.logout).toBeCalled();
    });
  });
});
