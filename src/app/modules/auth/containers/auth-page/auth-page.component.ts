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

  constructor(private authFacade: AuthFacade) {}

  login(event: LoginForm) {
    this.authFacade.login(event);
  }
}
