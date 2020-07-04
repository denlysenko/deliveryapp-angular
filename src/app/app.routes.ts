import { Routes } from '@angular/router';

import { Roles } from '@common/enums';

import { AuthGuard, RolesGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders.module').then((m) => m.OrdersModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./modules/payments/payments.module').then(
        (m) => m.PaymentsModule
      ),
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
    canLoad: [AuthGuard, RolesGuard],
    data: {
      allowedRoles: [Roles.ADMIN]
    }
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canLoad: [AuthGuard, RolesGuard],
    data: {
      allowedRoles: [Roles.ADMIN]
    }
  },
  {
    path: 'logs',
    loadChildren: () =>
      import('./modules/logs/logs.module').then((m) => m.LogsModule),
    canLoad: [AuthGuard, RolesGuard],
    data: {
      allowedRoles: [Roles.ADMIN]
    }
  }
];
