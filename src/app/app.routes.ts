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
  }
];
