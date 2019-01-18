import { Routes } from '@angular/router';

import { AppShellComponent } from '@app-shell/containers';
import { AuthGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/orders',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        loadChildren: './modules/orders/orders.module#OrdersModule'
      }
    ]
  }
];
