import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { OrdersPageComponent } from './orders-list/containers/orders-page/orders-page.component';
import { OrdersResolver } from './orders-list/resolvers/orders.resolver';

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
    loadChildren: './create-order/create-order.module#CreateOrderModule',
    canLoad: [AuthGuard]
  },
  {
    path: ':id',
    loadChildren: './update-order/update-order.module#UpdateOrderModule',
    canLoad: [AuthGuard]
  }
];
