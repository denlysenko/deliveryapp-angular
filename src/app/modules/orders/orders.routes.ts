import { Routes } from '@angular/router';

import { CreateOrderPageComponent } from './containers/create-order-page/create-order-page.component';
import { OrdersPageComponent } from './containers/orders-page/orders-page.component';
import { OrdersResolver } from './resolvers/orders.resolver';
import { AuthGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    component: OrdersPageComponent,
    resolve: {
      orders: OrdersResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateOrderPageComponent,
    canActivate: [AuthGuard]
  }
];
