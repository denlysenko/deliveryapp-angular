import { Component } from '@angular/core';

import { LoginForm } from '../../models';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  moduleId: module.id,
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  loading$ = this.authFacade.error$;
  error$ = this.authFacade.error$;
  isLoggingIn = true;

  constructor(private authFacade: AuthFacade) {}

  login(event: LoginForm) {
    console.log(event);
    // this.authFacade.login(event);
  }
}
