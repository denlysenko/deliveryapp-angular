import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { Roles } from '@common/enums';

import { FeedbackService } from '@core/services';

import { InputMaskModule } from '@ui/inputmask';

import { User } from '@users/models';

import { AddressFormComponent } from '../address-form/address-form.component';
import { BankDetailsFormComponent } from '../bank-details-form/bank-details-form.component';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { PasswordFormComponent } from '../password-form/password-form.component';
import { ProfileFormComponent } from './profile-form.component';

describe('ProfileFormComponent', () => {
  let component: ProfileFormComponent;
  let fixture: ComponentFixture<ProfileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputMaskModule],
      declarations: [
        ProfileFormComponent,
        ContactsFormComponent,
        PasswordFormComponent,
        AddressFormComponent,
        BankDetailsFormComponent
      ],
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
    fixture = TestBed.createComponent(ProfileFormComponent);
    component = fixture.componentInstance;
    component.user = { role: Roles.CLIENT } as User;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitProfileForm()', () => {
    beforeEach(() => {
      spyOn(component.profileUpdated, 'emit');
    });

    it('should emit profileUpdated event if form is valid', () => {
      component.profileForm.patchValue({
        contacts: {
          email: 'test@test.com',
          phone: '1234'
        }
      });

      component.submitProfileForm();

      expect(component.profileUpdated.emit).toHaveBeenCalledWith({
        firstName: null,
        lastName: null,
        company: null,
        email: 'test@test.com',
        phone: '1234',
        address: {
          country: null,
          city: null,
          street: null,
          house: null
        },
        bankDetails: {
          name: null,
          accountNumber: null,
          bin: null,
          swift: null
        }
      });
    });

    it('should not emit profileUpdated event if form is invalid', () => {
      component.submitProfileForm();
      expect(component.profileUpdated.emit).not.toHaveBeenCalled();
    });
  });

  describe('submitPasswordForm()', () => {
    beforeEach(() => {
      spyOn(component.passwordUpdated, 'emit');
    });

    it('should emit updatePassword event if form is valid', () => {
      component.passwordForm.patchValue({
        oldPassword: 'password',
        newPassword: 'password1',
        confirmPassword: 'password1'
      });

      component.submitPasswordForm();

      expect(component.passwordUpdated.emit).toHaveBeenCalledWith({
        oldPassword: 'password',
        newPassword: 'password1'
      });
    });
  });
});
