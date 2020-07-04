import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FeedbackService } from '@core/services';
import { CoreFacade } from '@core/store';

import { InputMaskModule } from '@ui/inputmask';

import { User } from '@users/models';

import { of, throwError } from 'rxjs';

import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { BankDetailsFormComponent } from '../../components/bank-details-form/bank-details-form.component';
import { ContactsFormComponent } from '../../components/contacts-form/contacts-form.component';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { PasswordPayload } from '../../models';
import { ProfileService } from '../../services/profile.service';
import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputMaskModule],
      declarations: [
        ProfilePageComponent,
        ProfileFormComponent,
        ContactsFormComponent,
        PasswordFormComponent,
        AddressFormComponent,
        BankDetailsFormComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              profile: {}
            })
          }
        },
        {
          provide: ProfileService,
          useValue: {
            updateProfile: () => {},
            updatePassword: () => {}
          }
        },
        {
          provide: CoreFacade,
          useValue: {
            updateSelf: jest.fn()
          }
        },
        {
          provide: FeedbackService,
          useValue: {
            success: jest.fn()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateProfile()', () => {
    const payload: User = {
      email: 'test@test.com',
      phone: '1234'
    };
    let profileService: ProfileService;

    beforeEach(() => {
      profileService = TestBed.inject(ProfileService);
    });

    it('should call ProfileService.updateProfile()', () => {
      spyOn(profileService, 'updateProfile').and.returnValue(of(payload));
      component.updateProfile(payload);
      expect(profileService.updateProfile).toHaveBeenCalledWith(payload);
    });

    it('should call CoreFacade.updateSelf()', () => {
      const coreFacade: CoreFacade = TestBed.inject(CoreFacade);
      spyOn(profileService, 'updateProfile').and.returnValue(of(payload));
      component.updateProfile(payload);
      expect(coreFacade.updateSelf).toHaveBeenCalledWith(payload);
    });

    it('should call FeedbackService.success()', () => {
      const feedbackService: FeedbackService = TestBed.inject(FeedbackService);
      spyOn(profileService, 'updateProfile').and.returnValue(of(payload));
      component.updateProfile(payload);
      expect(feedbackService.success).toHaveBeenCalled();
    });

    it('should send error to profileError$', () => {
      spyOn(profileService, 'updateProfile').and.returnValue(
        throwError({ error: 'error' })
      );
      component.updateProfile(payload);
      expect(component.profileError$.getValue()).toEqual({ error: 'error' });
    });
  });

  describe('updatePassword()', () => {
    const payload: PasswordPayload = {
      oldPassword: 'oldPassword',
      newPassword: 'password'
    };
    let profileService: ProfileService;

    beforeEach(() => {
      profileService = TestBed.inject(ProfileService);
    });

    it('should call ProfileService.updatePassword()', () => {
      spyOn(profileService, 'updatePassword').and.returnValue(of(true));
      component.updatePassword(payload);
      expect(profileService.updatePassword).toHaveBeenCalledWith(payload);
    });

    it('should call FeedbackService.success()', () => {
      const feedbackService: FeedbackService = TestBed.inject(FeedbackService);
      spyOn(profileService, 'updatePassword').and.returnValue(of(true));
      component.updatePassword(payload);
      expect(feedbackService.success).toHaveBeenCalled();
    });

    it('should send error to passwordError$', () => {
      spyOn(profileService, 'updatePassword').and.returnValue(
        throwError({ error: 'error' })
      );
      component.updatePassword(payload);
      expect(component.passwordError$.getValue()).toEqual({ error: 'error' });
    });
  });
});
