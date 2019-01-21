import { Routes } from '@angular/router';

import { OrdersPageComponent } from './containers/orders-page/orders-page.component';
import { OrdersResolver } from './resolvers/orders.resolver';

export const routes: Routes = [
  {
    path: '',
    component: OrdersPageComponent,
    resolve: {
      orders: OrdersResolver
    }
  }
];
