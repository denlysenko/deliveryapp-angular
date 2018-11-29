import { Component } from '@angular/core';

import { AuthForm } from '../../models';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  moduleId: module.id,
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  loading$ = this.authFacade.loading$;
  error$ = this.authFacade.error$;
  isLoggingIn = true;

  constructor(private authFacade: AuthFacade) {}

  doAuth(formValue: AuthForm) {
    this.authFacade[this.isLoggingIn ? 'login' : 'register'](formValue);
  }
}
