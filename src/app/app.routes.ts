import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

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
  }
];
