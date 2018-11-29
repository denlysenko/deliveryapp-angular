import { Route } from '@angular/router';

import { AuthPageComponent } from './containers/auth-page/auth-page.component';

export const routes: Route[] = [
  {
    path: 'auth',
    component: AuthPageComponent
  }
];
