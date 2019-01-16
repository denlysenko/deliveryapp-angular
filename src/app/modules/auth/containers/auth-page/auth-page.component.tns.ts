import { Component } from '@angular/core';

import { Page } from 'ui/page';

import { AuthPageBase } from '../../base/AuthPageBase';
import { AuthFacade } from '../../store/auth.facade';

@Component({
  moduleId: module.id,
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends AuthPageBase {
  constructor(authFacade: AuthFacade, private page: Page) {
    super(authFacade);
    this.page.actionBarHidden = true;
  }
}