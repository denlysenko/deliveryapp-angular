import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';
import { emailValidator } from '@common/validators';

import { LoginError, LoginForm } from '../../models';

@Component({
  moduleId: module.id,
  selector: 'da-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent extends BaseFormComponent implements OnInit {
  @Input()
  loading: boolean;

  @Input()
  set error(value: LoginError) {
    if (value) {
      this.handleError(value);
    }
  }

  @Output()
  formSubmitted = new EventEmitter<LoginForm>();

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  private initForm() {
    this.form = this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.required, emailValidator])
        ],
        password: [null, Validators.required]
      },
      { updateOn: 'submit' }
    );
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
}
