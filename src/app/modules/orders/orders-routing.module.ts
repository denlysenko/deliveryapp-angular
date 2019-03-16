import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { routes } from './orders.routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      ...routes,
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
    ])
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
