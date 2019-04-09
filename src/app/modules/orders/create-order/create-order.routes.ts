import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { CreateOrderPageComponent } from './containers/create-order-page/create-order-page.component';
import { ClientsResolver } from './resolvers/clients.resolver';

export const routes: Routes = [
  {
    path: '',
    component: CreateOrderPageComponent,
    resolve: {
      clients: ClientsResolver
    },
    canActivate: [AuthGuard]
  }
];
