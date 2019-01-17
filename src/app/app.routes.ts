import { Routes } from '@angular/router';

import { AppShellComponent } from '@app-shell/containers/app-shell/app-shell.component';
import { AuthGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'orders',
        loadChildren: './modules/orders/orders.module#OrdersModule'
      }
    ]
  }
];
