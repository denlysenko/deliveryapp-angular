import { Routes } from '@angular/router';

import { Roles } from '@common/enums';

import { AuthGuard, RolesGuard } from '@core/guards';

import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { SettingsResolver } from './resolvers/settings.resolver';

export const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    resolve: {
      settings: SettingsResolver
    },
    canActivate: [AuthGuard, RolesGuard],
    data: {
      allowedRoles: [Roles.ADMIN]
    }
  }
];
