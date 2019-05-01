import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { UsersPageComponent } from './containers/users-page/users-page.component';
import { UsersResolver } from './resolvers/users.resolver';

export const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    resolve: {
      users: UsersResolver
    },
    // TODO: add RolesGuard
    canActivate: [AuthGuard]
  }
];
