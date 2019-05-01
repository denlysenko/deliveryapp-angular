import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { Roles } from '@common/enums';
import { ValidationError } from '@common/models';

import { LoaderService } from '@core/services';

import { User } from '@users/models';

import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import * as app from 'tns-core-modules/application';
import { getViewById } from 'tns-core-modules/ui/page/page';

import { PasswordPayload } from '../../models';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component.tns';

@Component({
  selector: 'da-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent implements OnInit {
  readonly roles = Roles;

  profileForm: any;
  passwordForm: any;

  @Input() user: User;
  @Input() profileError: ValidationError;
  @Input() passwordError: ValidationError;

  @Input()
  set loading(isLoading: boolean) {
    this._loading = isLoading;
    this.loaderService[isLoading ? 'start' : 'stop']();
  }
  get loading(): boolean {
    return this._loading;
  }

  @Output() profileUpdated = new EventEmitter<User>();
  @Output() passwordUpdated = new EventEmitter<PasswordPayload>();

  @ViewChild(ContactsFormComponent) private contactsForm: ContactsFormComponent;

  private _loading = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.initProfileForm();
    this.initPasswordForm();
  }

  onDrawerButtonTap() {
    const sideDrawer = <RadSideDrawer>getViewById(app.getRootView(), 'drawer');
    sideDrawer.toggleDrawerState();
  }

  async submitProfileForm() {
    if (await this.contactsForm.validate()) {
      const { address, bankDetails, contacts } = this.profileForm;
      this.profileUpdated.emit({ address, bankDetails, ...contacts });
    }
  }

  submitPasswordForm() {
    const { oldPassword, newPassword } = this.passwordForm;
    this.passwordUpdated.emit({ oldPassword, newPassword });
  }

  // tslint:disable-next-line:cognitive-complexity
  private initProfileForm() {
    this.profileForm = {
      contacts: {
        firstName: this.user.firstName || null,
        lastName: this.user.lastName || null,
        company: this.user.company || null,
        email: this.user.email || '',
        phone: this.user.phone || null
      }
    };

    if (this.user.role === this.roles.CLIENT) {
      const address = {
        country: (this.user.address && this.user.address.country) || null,
        city: (this.user.address && this.user.address.city) || null,
        street: (this.user.address && this.user.address.street) || null,
        house: (this.user.address && this.user.address.house) || null
      };

      const bankDetails = {
        name: (this.user.bankDetails && this.user.bankDetails.name) || null,
        accountNumber:
          (this.user.bankDetails && this.user.bankDetails.accountNumber) ||
          null,
        bin: (this.user.bankDetails && this.user.bankDetails.bin) || null,
        swift: (this.user.bankDetails && this.user.bankDetails.swift) || null
      };

      this.profileForm.address = address;
      this.profileForm.bankDetails = bankDetails;
    }
  }

  private initPasswordForm() {
    this.passwordForm = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}
