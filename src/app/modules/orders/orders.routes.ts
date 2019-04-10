import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: 'create',
    loadChildren: './create-order/create-order.module#CreateOrderModule',
    canLoad: [AuthGuard]
  },
  {
    path: ':id',
    loadChildren: './update-order/update-order.module#UpdateOrderModule',
    canLoad: [AuthGuard]
  }
];
