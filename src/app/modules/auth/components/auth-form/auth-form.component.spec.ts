import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { MessageService } from 'primeng/primeng';

import { AuthFormComponent, REGISTER_FIELDS } from './auth-form.component';

const messageServiceStub = {
  add: jasmine.createSpy('add')
};

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [AuthFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MessageService,
          useValue: messageServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
  });

  describe('isLoggingIn', () => {
    it('[`isLoggingIn = true`] should disable register fields', () => {
      component.isLoggingIn = true;
      fixture.detectChanges();
      REGISTER_FIELDS.forEach(field => {
        expect(component.form.get(field).disabled).toBeTruthy();
      });
    });

    it('[`isLoggingIn = false`] should enable register fields', () => {
      component.isLoggingIn = false;
      fixture.detectChanges();
      REGISTER_FIELDS.forEach(field => {
        expect(component.form.get(field).disabled).toBeFalsy();
      });
    });
  });

  describe('Validations', () => {
    describe('email field', () => {
      let email: AbstractControl;

      beforeEach(() => {
        email = component.form.get('email');
      });

      it('should have required error', () => {
        email.setValue('');
        expect(email.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        email.setValue('test@test.com');
        expect(email.hasError('required')).toBeFalsy();
      });

      it('should have email error', () => {
        email.setValue('test');
        expect(email.hasError('email')).toBeTruthy();
      });

      it('should not have email error', () => {
        email.setValue('test@test.com');
        expect(email.hasError('email')).toEqual(false);
      });
    });

    describe('password field', () => {
      let password: AbstractControl;

      beforeEach(() => {
        password = component.form.get('password');
      });

      it('should have required error', () => {
        password.setValue('');
        expect(password.hasError('required')).toBeTruthy();
      });

      it('should not have required error', () => {
        password.setValue('password');
        expect(password.hasError('required')).toBeFalsy();
      });
    });

    describe('confirmPassword field', () => {
      let password: AbstractControl;
      let confirmPassword: AbstractControl;

      beforeEach(() => {
        component.isLoggingIn = false;
        fixture.detectChanges();
        password = component.form.get('password');
        confirmPassword = component.form.get('confirmPassword');
      });

      it('should have mismatch error', () => {
        password.setValue('password');
        confirmPassword.setValue('123');
        expect(confirmPassword.hasError('mismatch')).toBeTruthy();
      });

      it('should not have mismatch error', () => {
        password.setValue('password');
        confirmPassword.setValue('password');
        expect(confirmPassword.hasError('mismatch')).toBeFalsy();
      });
    });
  });

  describe('submitForm', () => {
    let email: AbstractControl;
    let password: AbstractControl;

    beforeEach(() => {
      spyOn(component.formSubmitted, 'emit');
      component.isLoggingIn = true;
      fixture.detectChanges();
      email = component.form.get('email');
      password = component.form.get('password');
    });

    it('[form is valid] should emit formSubmitted', () => {
      email.setValue('test@test.com');
      password.setValue('password');

      component.submitForm();

      expect(component.formSubmitted.emit).toBeCalledWith({
        email: 'test@test.com',
        password: 'password'
      });
    });

    it('[form is invalid] should not emit formSubmitted', () => {
      email.setValue('');
      password.setValue('password');

      component.submitForm();

      expect(component.formSubmitted.emit).not.toBeCalled();
    });
  });

  describe('handleError()', () => {
    const error: any = {
      errors: [
        {
          path: 'email',
          message: 'error message'
        }
      ]
    };

    beforeEach(() => {
      component.error = error;
      fixture.detectChanges();
    });

    it('should set serverError', () => {
      const email = component.form.get('email');
      expect(email.hasError('serverError')).toBeTruthy();
    });

    it('should update errors dictionary', () => {
      expect(component.errors).toEqual({ email: 'error message' });
    });
  });
});
