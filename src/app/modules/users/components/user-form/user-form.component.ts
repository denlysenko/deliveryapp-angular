import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { roleNames, Roles } from '@common/enums';
import { ValidationError } from '@common/models';
import { emailValidator, passwordMatchValidator } from '@common/validators';

import { SelectItem } from 'primeng/api';

import { User } from '../../models';

@Component({
  selector: 'da-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent extends BaseFormComponent implements OnInit {
  readonly roles: SelectItem[] = [
    {
      label: roleNames[Roles.MANAGER],
      value: Roles.MANAGER
    },
    {
      label: roleNames[Roles.ADMIN],
      value: Roles.ADMIN
    }
  ];

  form: FormGroup;

  @Input() loading: boolean;

  @Input()
  set user(user: User) {
    this._user = user;
    this.initForm();
  }
  get user(): User {
    return this._user;
  }

  @Input()
  set error(error: ValidationError) {
    if (error) {
      this.handleError(error);
    }
  }

  @Output() submitted = new EventEmitter<User>();

  private _user: User;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  submitForm() {
    const { valid, value } = this.form;

    if (valid) {
      delete value.confirmPassword;
      this.submitted.emit(value);
    } else {
      this.validateAllFormFields();
    }
  }

  private initForm() {
    this.form = new FormGroup(
      {
        id: new FormControl((this.user && this.user.id) || null),
        email: new FormControl(
          (this.user && this.user.email) || null,
          Validators.compose([Validators.required, emailValidator])
        ),
        phone: new FormControl((this.user && this.user.phone) || null),
        firstName: new FormControl((this.user && this.user.firstName) || null),
        lastName: new FormControl((this.user && this.user.lastName) || null),
        role: new FormControl(
          (this.user && this.user.role) || this.roles[0].value,
          Validators.required
        ),
        password: new FormControl(
          { value: null, disabled: !!this.user },
          Validators.required
        ),
        confirmPassword: new FormControl({
          value: null,
          disabled: !!this.user
        })
      },
      {
        updateOn: 'submit',
        validators: !this.user
          ? passwordMatchValidator('password', 'confirmPassword')
          : null
      }
    );
  }
}
