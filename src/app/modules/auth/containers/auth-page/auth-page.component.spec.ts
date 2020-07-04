import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreFacade } from '@core/store';

import { MessagesFacade } from '@messages/store';

import { of, throwError } from 'rxjs';

import { AuthForm } from '../../models';
import { AuthService } from '../../services/auth.service';
import { AuthPageComponent } from './auth-page.component';

const token = 'token';

const authServiceStub = {
  login: jest.fn().mockReturnValue(of({ token })),
  register: jest.fn().mockReturnValue(of({ token }))
};

const coreFacadeStub = {
  navigate: jest.fn()
};

const messagesFacadeStub = {
  subscribeToMessages: jest.fn()
};

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPageComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        },
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
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have `isLoggingIn = true` by default', () => {
    expect(component.isLoggingIn).toBeTruthy();
  });

  describe('doAuth()', () => {
    let formValue: AuthForm;

    beforeEach(() => {
      formValue = {
        email: 'test@test.com',
        password: 'password'
      };
    });

    it('[`isLoggingIn = true`] should call AuthService.login', () => {
      component.doAuth(formValue);
      expect(authService.login).toHaveBeenCalledWith(formValue);
    });

    it('[`isLoggingIn = false`] should call AuthService.register', () => {
      component.isLoggingIn = false;
      component.doAuth(formValue);
      expect(authService.register).toHaveBeenCalledWith(formValue);
    });

    it('should navigate if success', () => {
      const coreFacade: CoreFacade = TestBed.inject(CoreFacade);

      component.doAuth(formValue);
      expect(coreFacade.navigate).toHaveBeenCalled();
    });

    it('should subscribe to messages', () => {
      const messagesFacade: MessagesFacade = TestBed.inject(MessagesFacade);

      component.doAuth(formValue);
      expect(messagesFacade.subscribeToMessages).toHaveBeenCalled();
    });

    it('should send error to error$', () => {
      authService.login = jest
        .fn()
        .mockReturnValue(throwError({ error: 'error' }));

      component.doAuth(formValue);
      expect(component.error$.getValue()).toEqual({ error: 'error' });
    });
  });
});
