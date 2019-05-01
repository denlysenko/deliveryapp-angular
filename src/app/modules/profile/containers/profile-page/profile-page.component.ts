import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ValidationError } from '@common/models';

import { FeedbackService } from '@core/services';
import { CoreFacade } from '@core/store';

import { User } from '@users/models';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { PasswordPayload } from '../../models';
import { ProfileService } from '../../services/profile.service';

const PROFILE_UPDATED_MESSAGE = 'Profile updated';
const PASSWORD_UPDATED_MESSAGE = 'Password updated';

@Component({
  selector: 'da-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  profile$ = this.route.data.pipe(map(data => data.profile));
  loading$ = new BehaviorSubject<boolean>(false);
  profileError$ = new BehaviorSubject<ValidationError | null>(null);
  passwordError$ = new BehaviorSubject<ValidationError | null>(null);

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private coreFacade: CoreFacade,
    private feedbackService: FeedbackService
  ) {}

  updateProfile(profile: User) {
    this.loading$.next(true);
    this.profileService.updateProfile(profile).subscribe(
      res => {
        this.loading$.next(false);
        this.coreFacade.updateSelf(res);
        this.feedbackService.success(PROFILE_UPDATED_MESSAGE);
      },
      err => {
        this.loading$.next(false);
        this.profileError$.next(err);
      }
    );
  }

  updatePassword(passwordPayload: PasswordPayload) {
    this.loading$.next(true);
    this.profileService.updatePassword(passwordPayload).subscribe(
      () => {
        this.loading$.next(false);
        this.feedbackService.success(PASSWORD_UPDATED_MESSAGE);
      },
      err => {
        this.loading$.next(false);
        this.passwordError$.next(err);
      }
    );
  }
}
