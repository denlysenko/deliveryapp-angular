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

const UNREAD_MESSAGES = 3;

const coreFacadeStub = {
  self$: of(USER),
  unreadMessages$: of(UNREAD_MESSAGES),
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

  it('should have `showMessages = false` by default', () => {
    expect(component.showMessages).toBeFalsy();
  });

  describe('logout()', () => {
    it('should call CoreFacade.logout', () => {
      const coreFacade = TestBed.get(CoreFacade);
      component.logout();
      expect(coreFacade.logout).toBeCalled();
    });
  });
});
