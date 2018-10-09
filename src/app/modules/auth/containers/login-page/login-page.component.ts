import { Component } from '@angular/core';

import { LoginForm } from '../../models';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['../common-styles/page.component.scss']
})
export class LoginPageComponent {
  loading$ = this.authFacade.loginError$;
  error$ = this.authFacade.loginError$;

  constructor(private authFacade: AuthFacade) {}

  login(event: LoginForm) {
    this.authFacade.login(event);
  }
}
