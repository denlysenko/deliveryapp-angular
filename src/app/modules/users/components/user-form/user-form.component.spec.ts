import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';

import { Roles } from '@common/enums';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.user = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validations', () => {
    describe('email field', () => {
      let email: AbstractControl;

      beforeEach(() => {
        email = component.form.get('email');
      });

      it('should have required error', () => {
        email.setValue(null);
        expect(email.hasError('required')).toEqual(true);
      });

      it('should not have required error', () => {
        email.setValue(100);
        expect(email.hasError('required')).toEqual(false);
      });

      it('should have email error', () => {
        email.setValue('test');
        expect(email.hasError('email')).toEqual(true);
      });

      it('should not have email error', () => {
        email.setValue('test@test.com');
        expect(email.hasError('email')).toEqual(false);
      });
    });

    describe('role field', () => {
      let role: AbstractControl;

      beforeEach(() => {
        role = component.form.get('role');
      });

      it('should have required error', () => {
        role.setValue(null);
        expect(role.hasError('required')).toEqual(true);
      });

      it('should not have required error', () => {
        role.setValue(new Date());
        expect(role.hasError('required')).toEqual(false);
      });
    });

    describe('password field', () => {
      let password: AbstractControl;

      beforeEach(() => {
        password = component.form.get('password');
      });

      it('should have required error', () => {
        password.setValue('');
        expect(password.hasError('required')).toEqual(true);
      });

      it('should not have required error', () => {
        password.setValue('password');
        expect(password.hasError('required')).toEqual(false);
      });
    });

    describe('confirmPassword field', () => {
      let password: AbstractControl;
      let confirmPassword: AbstractControl;

      beforeEach(() => {
        password = component.form.get('password');
        confirmPassword = component.form.get('confirmPassword');
      });

      it('should have mismatch error', () => {
        password.setValue('password');
        confirmPassword.setValue('123');
        expect(confirmPassword.hasError('mismatch')).toEqual(true);
      });

      it('should not have mismatch error', () => {
        password.setValue('password');
        confirmPassword.setValue('password');
        expect(confirmPassword.hasError('mismatch')).toEqual(false);
      });
    });
  });

  describe('submitForm()', () => {
    beforeEach(() => {
      spyOn(component.submitted, 'emit');
    });

    it('should emit submitted event if form is valid', () => {
      const payload = {
        id: null,
        email: 'test@test.com',
        role: Roles.MANAGER,
        password: 'password',
        confirmPassword: 'password'
      };

      component.form.patchValue(payload);
      component.submitForm();
      expect(component.submitted.emit).toHaveBeenCalledWith({
        id: null,
        firstName: null,
        lastName: null,
        phone: null,
        email: 'test@test.com',
        role: Roles.MANAGER,
        password: 'password'
      });
    });

    it('should not emit submitted event if form is invalid', () => {
      component.submitForm();
      expect(component.submitted.emit).not.toHaveBeenCalled();
    });
  });
});
