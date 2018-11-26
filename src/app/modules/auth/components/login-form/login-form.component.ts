import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';
import { emailValidator } from '@common/validators';

import { LoginError, LoginForm } from '../../models';

@Component({
  selector: 'da-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../common-styles/form.component.scss']
})
export class LoginFormComponent extends BaseFormComponent implements OnInit {
  loginForm: FormGroup;

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

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.formSubmitted.emit(this.loginForm.value);
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  private initForm() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(
          null,
          Validators.compose([Validators.required, emailValidator])
        ),
        password: new FormControl(null, Validators.required)
      },
      { updateOn: 'submit' }
    );
  }

  // override parent method due to different error object from server
  protected handleError(error: any) {
    if (error && error.message) {
      error.fields.forEach(field => {
        this.loginForm.get(field).setErrors({ serverError: true });
        this.errors[field] = error.message;
      });
    }
  }
}
