import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';

import { UpdateOrderPageComponent } from './containers/update-order-page/update-order-page.component';
import { OrderResolver } from './resolvers/order.resolver';

export const routes: Routes = [
  {
    path: '',
    component: UpdateOrderPageComponent,
    resolve: {
      order: OrderResolver
    },
    canActivate: [AuthGuard]
  }
];
