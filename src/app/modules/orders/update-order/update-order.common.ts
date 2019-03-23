import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { containers } from './containers';
import { UpdateOrderPageComponent } from './containers/update-order-page/update-order-page.component';

import { OrderResolver } from './resolvers/order.resolver';

export const componentDeclarations: any[] = [...containers];

export const providerDeclarations: any[] = [OrderResolver];

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
