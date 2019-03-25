import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { passwordMatchValidator } from '@common/validators';

import { FeedbackService } from '@core/services';

import { PasswordFormComponent } from './password-form.component';

describe('PasswordFormComponent', () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PasswordFormComponent],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            error: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup(
      {
        oldPassword: new FormControl(null, Validators.required),
        newPassword: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null)
      },
      {
        validators: passwordMatchValidator('newPassword', 'confirmPassword'),
        updateOn: 'blur'
      }
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validations', () => {
    describe('oldPassword field', () => {
      let oldPassword: AbstractControl;

      beforeEach(() => {
        oldPassword = component.form.get('oldPassword');
      });

      it('oldPassword field should have required error', () => {
        oldPassword.setValue('');
        expect(oldPassword.hasError('required')).toEqual(true);
      });

      it('oldPassword field should not have required error', () => {
        oldPassword.setValue('password');
        expect(oldPassword.hasError('required')).toEqual(false);
      });
    });

    describe('newPassword field', () => {
      let newPassword: AbstractControl;

      beforeEach(() => {
        newPassword = component.form.get('newPassword');
      });

      it('newPassword field should have required error', () => {
        newPassword.setValue('');
        expect(newPassword.hasError('required')).toEqual(true);
      });

      it('newPassword field should not have required error', () => {
        newPassword.setValue('password');
        expect(newPassword.hasError('required')).toEqual(false);
      });
    });

    describe('confirmPassword field', () => {
      let newPassword: AbstractControl;
      let confirmPassword: AbstractControl;

      beforeEach(() => {
        newPassword = component.form.get('newPassword');
        confirmPassword = component.form.get('confirmPassword');
      });

      it('confirmPassword field should have mismatch error', () => {
        newPassword.setValue('password');
        confirmPassword.setValue('password2');
        expect(confirmPassword.hasError('mismatch')).toEqual(true);
      });

      it('confirmPassword field should not have mismatch error', () => {
        newPassword.setValue('password');
        confirmPassword.setValue('password');
        expect(confirmPassword.hasError('mismatch')).toEqual(false);
      });
    });
  });

  describe('save', () => {
    beforeEach(() => {
      spyOn(component.passwordChanged, 'emit');
    });

    it('should emit passwordChanged if form is valid', () => {
      component.form.patchValue({
        oldPassword: 'oldPassword',
        newPassword: 'password',
        confirmPassword: 'password'
      });

      component.save();
      expect(component.passwordChanged.emit).toHaveBeenCalled();
    });

    it('should not emit passwordChanged if form is invalid', () => {
      component.save();
      expect(component.passwordChanged.emit).not.toHaveBeenCalled();
    });
  });
});
