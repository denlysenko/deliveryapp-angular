import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';
import { ValidationError } from '@common/models';
import { emailValidator, passwordMatchValidator } from '@common/validators';
import { FeedbackService } from '@core/services';

import { AuthForm, LoginError } from '../../models';

export const REGISTER_FIELDS = [
  'firstName',
  'lastName',
  'company',
  'phone',
  'confirmPassword'
];

@Component({
  moduleId: module.id,
  selector: 'da-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent extends BaseFormComponent {
  @Input()
  loading: boolean;

  @Input()
  set isLoggingIn(value: boolean) {
    this._isLoggingIn = value;
    this[value ? 'disableFields' : 'enableFields']();
  }
  get isLoggingIn(): boolean {
    return this._isLoggingIn;
  }

  @Input()
  set error(value: LoginError | ValidationError) {
    if (value) {
      this.handleError(value);
    }
  }

  private _isLoggingIn: boolean;

  @Output()
  formSubmitted = new EventEmitter<AuthForm>();

  constructor(
    private fb: FormBuilder,
    protected feedbackService: FeedbackService
  ) {
    super();
    this.initForm();
  }

  submitForm() {
    if (this.form.valid) {
      if (!this.isLoggingIn) {
        delete this.form.value.confirmPassword;
      }

      this.formSubmitted.emit(this.form.value);
    } else {
      this.validateAllFormFields();
    }
  }

  private initForm() {
    this.form = this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.required, emailValidator])
        ],
        password: [null, Validators.required],
        firstName: [null],
        lastName: [null],
        company: [null],
        phone: [null],
        confirmPassword: [null]
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword')
      }
    );
  }

  private disableFields() {
    REGISTER_FIELDS.forEach(field => {
      this.form.get(field).disable();
    });
  }

  private enableFields() {
    REGISTER_FIELDS.forEach(field => {
      this.form.get(field).enable();
    });
  }
}
