import { Routes } from '@angular/router';

import { Roles } from '@common/enums';

import { AuthGuard, RolesGuard } from '@core/guards';

import { UsersPageComponent } from './containers/users-page/users-page.component';
import { UsersResolver } from './resolvers/users.resolver';

export const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    resolve: {
      users: UsersResolver
    },
    canActivate: [AuthGuard, RolesGuard],
    data: {
      allowedRoles: [Roles.ADMIN]
    }
  }
];
