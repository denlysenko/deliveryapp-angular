import { Route } from '@angular/router';

import { LoginPageComponent } from './containers/login-page/login-page.component';

export const routes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent
  }
];
