import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { OrdersPageComponent } from './orders-list/containers/orders-page/orders-page.component';
import { OrdersResolver } from './orders-list/resolvers/orders.resolver';
import { routes } from './orders.routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrdersPageComponent,
        resolve: {
          orders: OrdersResolver
        },
        canActivate: [AuthGuard]
      },
      ...routes
    ])
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
