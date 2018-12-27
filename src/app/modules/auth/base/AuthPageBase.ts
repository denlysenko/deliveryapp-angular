import { AuthForm } from '../models/auth-form.model';
import { AuthFacade } from '../store/auth.facade';

export abstract class AuthPageBase {
  loading$ = this.authFacade.loading$;
  error$ = this.authFacade.error$;
  isLoggingIn = true;

  constructor(private authFacade: AuthFacade) {}

  doAuth(formValue: AuthForm) {
    this.authFacade[this.isLoggingIn ? 'login' : 'register'](formValue);
  }
}
