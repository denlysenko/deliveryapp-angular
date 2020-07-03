import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseFormComponent } from '@base/BaseFormComponent';

import { Roles } from '@common/enums';
import { ValidationError } from '@common/models';
import { emailValidator, passwordMatchValidator } from '@common/validators';

import { User } from '@users/models';

import { PasswordPayload } from '../../models';

@Component({
  selector: 'da-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent extends BaseFormComponent implements OnInit {
  readonly roles = Roles;

  profileForm: FormGroup;
  passwordForm: FormGroup;

  @Input() user: User;
  @Input() loading: boolean;
  @Input() profileError: ValidationError;
  @Input() passwordError: ValidationError;

  @Output() profileUpdated = new EventEmitter<User>();
  @Output() passwordUpdated = new EventEmitter<PasswordPayload>();

  constructor(private readonly cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.initProfileForm();
    this.initPasswordForm();
  }

  submitProfileForm() {
    if (this.profileForm.valid) {
      const { address, bankDetails, contacts } = this.profileForm.value;

      this.profileUpdated.emit({ address, bankDetails, ...contacts });
    } else {
      this.validateAllFormFields(this.profileForm);
    }
  }

  submitPasswordForm() {
    const { oldPassword, newPassword } = this.passwordForm.value;
    this.passwordUpdated.emit({ oldPassword, newPassword });
  }

  // tslint:disable-next-line:cognitive-complexity
  private initProfileForm() {
    this.profileForm = new FormGroup(
      {
        contacts: new FormGroup({
          firstName: new FormControl(this.user.firstName || null),
          lastName: new FormControl(this.user.lastName || null),
          company: new FormControl(this.user.company || null),
          email: new FormControl(
            this.user.email || null,
            Validators.compose([Validators.required, emailValidator])
          ),
          phone: new FormControl(this.user.phone || null)
        })
      },
      { updateOn: 'submit' }
    );

    if (this.user.role === this.roles.CLIENT) {
      const address = new FormGroup({
        country: new FormControl(
          (this.user.address && this.user.address.country) || null
        ),
        city: new FormControl(
          (this.user.address && this.user.address.city) || null
        ),
        street: new FormControl(
          (this.user.address && this.user.address.street) || null
        ),
        house: new FormControl(
          (this.user.address && this.user.address.house) || null
        )
      });

      const bankDetails = new FormGroup({
        name: new FormControl(
          (this.user.bankDetails && this.user.bankDetails.name) || null
        ),
        accountNumber: new FormControl(
          (this.user.bankDetails && this.user.bankDetails.accountNumber) || null
        ),
        bin: new FormControl(
          (this.user.bankDetails && this.user.bankDetails.bin) || null
        ),
        swift: new FormControl(
          (this.user.bankDetails && this.user.bankDetails.swift) || null
        )
      });

      this.profileForm.addControl('address', address);
      this.profileForm.addControl('bankDetails', bankDetails);
    }

    // to fix float label overlapping on inputs with native value property
    setTimeout(() => {
      this.cdr.markForCheck();
    });
  }

  private initPasswordForm() {
    this.passwordForm = new FormGroup(
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
  }
}
