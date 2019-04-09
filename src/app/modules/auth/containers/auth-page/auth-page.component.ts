import { Component } from '@angular/core';

import { StorageService } from '@core/services';
import { CoreFacade } from '@core/store';

import { AuthPageBase } from '../../base/AuthPageBase';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent extends AuthPageBase {
  constructor(
    authService: AuthService,
    storageService: StorageService,
    coreFacade: CoreFacade
  ) {
    super(authService, storageService, coreFacade);
  }
}
