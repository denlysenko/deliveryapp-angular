import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { OrdersPageComponent } from './containers/orders-page/orders-page.component';
import { OrdersResolver } from './resolvers/orders.resolver';

export const routes: Routes = [
  {
    path: '',
    component: OrdersPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      orders: OrdersResolver
    }
  }
];
