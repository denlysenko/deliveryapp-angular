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
    loadChildren: './modules/orders/orders.module#OrdersModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: './modules/payments/payments.module#PaymentsModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './modules/users/users.module#UsersModule',
    canLoad: [AuthGuard, RolesGuard],
    data: {
      allowedRoles: [Roles.ADMIN]
    }
  },
  {
    path: 'settings',
    loadChildren: './modules/settings/settings.module#SettingsModule',
    canLoad: [AuthGuard, RolesGuard],
    data: {
      allowedRoles: [Roles.ADMIN]
    }
  }
];
