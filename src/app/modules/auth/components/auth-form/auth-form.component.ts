import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';
import { emailValidator } from '@common/validators';

import { LoginError, LoginForm } from '../../models';

const REGISTER_FIELDS = [
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
  set error(value: LoginError) {
    if (value) {
      this.handleError(value);
    }
  }

  private _isLoggingIn: boolean;

  @Output()
  formSubmitted = new EventEmitter<LoginForm>();

  constructor(private fb: FormBuilder) {
    super();
    this.initForm();
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  // override parent method due to different error object from server
  protected handleError(error: any) {
    if (error && error.message) {
      error.fields.forEach(field => {
        this.form.get(field).setErrors({ serverError: true });
        this.errors[field] = error.message;
      });
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
      { updateOn: 'submit' }
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
