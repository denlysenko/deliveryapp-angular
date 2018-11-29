import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { AuthForm } from '../../models';
import { AuthFacade } from '../../store/auth.facade';
import { AuthPageComponent } from './auth-page.component';

const authFacadeStub = {
  loading$: of(false),
  error$: of(null),
  login: jasmine.createSpy('login'),
  register: jasmine.createSpy('register')
};

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthPageComponent],
      providers: [
        {
          provide: AuthFacade,
          useValue: authFacadeStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have `loading$` defined', () => {
    expect(component.loading$).toBeDefined();
  });

  it('should have `error$` defined', () => {
    expect(component.error$).toBeDefined();
  });

  it('should have `isLoggingIn = true` by default', () => {
    expect(component.isLoggingIn).toBeTruthy();
  });

  describe('doAuth()', () => {
    beforeEach(() => {
      authFacadeStub.login.calls.reset();
      authFacadeStub.register.calls.reset();
    });

    it('[`isLoggingIn = true`] should call AuthFacade.login', () => {
      const authFacade = TestBed.get(AuthFacade);
      const formValue: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };

      component.doAuth(formValue);

      expect(authFacade.login).toBeCalledWith(formValue);
    });

    it('[`isLoggingIn = false`] should call AuthFacade.register', () => {
      const authFacade = TestBed.get(AuthFacade);
      const formValue: AuthForm = {
        email: 'test@test.com',
        password: 'password'
      };

      component.isLoggingIn = false;
      component.doAuth(formValue);

      expect(authFacade.register).toBeCalledWith(formValue);
    });
  });
});
