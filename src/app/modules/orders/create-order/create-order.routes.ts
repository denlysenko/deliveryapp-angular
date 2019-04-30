import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { CreateOrderPageComponent } from './containers/create-order-page/create-order-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CreateOrderPageComponent,
    canActivate: [AuthGuard]
  }
];
