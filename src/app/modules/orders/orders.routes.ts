import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: 'create',
    loadChildren: () =>
      import('./create-order/create-order.module').then(
        (m) => m.CreateOrderModule
      ),
    canLoad: [AuthGuard]
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./update-order/update-order.module').then(
        (m) => m.UpdateOrderModule
      ),
    canLoad: [AuthGuard]
  }
];
