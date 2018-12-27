import { Component } from '@angular/core';

import { AuthPageBase } from '../../base/AuthPageBase';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends AuthPageBase {
  constructor(authFacade: AuthFacade) {
    super(authFacade);
  }
}
