import { Routes } from '@angular/router';

import { Roles } from '@common/enums';

import { AuthGuard, RolesGuard } from '@core/guards';

import { LogsPageComponent } from './containers/logs-page/logs-page.component';
import { LogsResolver } from './resolvers/logs.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LogsPageComponent,
    resolve: {
      logs: LogsResolver
    },
    canActivate: [AuthGuard, RolesGuard],
    data: {
      allowedRoles: [Roles.ADMIN]
    }
  }
];
