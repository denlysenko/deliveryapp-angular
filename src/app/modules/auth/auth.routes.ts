import { Route } from '@angular/router';

import { AuthPageComponent } from './containers/auth-page/auth-page.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

export const routes: Route[] = [
  {
    path: 'auth',
    component: AuthPageComponent,
    canActivate: [AuthenticatedGuard]
  }
];
