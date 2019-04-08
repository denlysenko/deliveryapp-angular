import { ACCESS_TOKEN } from '@common/constants';
import { ValidationError } from '@common/models';

import { StorageService } from '@core/services';
import { CoreFacade } from '@core/store';

import { BehaviorSubject } from 'rxjs';

import { AuthForm, LoginError } from '../models';
import { AuthService } from '../services/auth.service';

export abstract class AuthPageBase {
  isLoggingIn = true;

  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<LoginError | ValidationError | null>(null);

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private coreFacade: CoreFacade
  ) {}

  doAuth(formValue: AuthForm) {
    this.loading$.next(true);

    this.authService[this.isLoggingIn ? 'login' : 'register'](
      formValue
    ).subscribe(
      ({ token }) => {
        this.loading$.next(false);
        this.storageService.setItem(ACCESS_TOKEN, token);
        this.coreFacade.navigate({
          path: [''],
          extras: {
            clearHistory: true,
            transition: {
              name: 'flip',
              duration: 300,
              curve: 'linear'
            }
          }
        });
      },
      err => {
        this.error$.next(err);
        this.loading$.next(false);
      }
    );
  }
}
