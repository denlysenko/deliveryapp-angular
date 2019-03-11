import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { CreateOrderPageComponent } from './containers/create-order-page/create-order-page.component';
import { OrdersPageComponent } from './containers/orders-page/orders-page.component';
import { UpdateOrderPageComponent } from './containers/update-order-page/update-order-page.component';
import { ClientsResolver } from './resolvers/clients.resolver';
import { OrdersResolver } from './resolvers/orders.resolver';

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
    resolve: {
      clients: ClientsResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: UpdateOrderPageComponent,
    canActivate: [AuthGuard]
  }
];
