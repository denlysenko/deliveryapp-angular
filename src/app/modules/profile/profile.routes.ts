import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { ProfilePageComponent } from './containers/profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    // resolve: {
    //   orders: OrdersResolver
    // },
    canActivate: [AuthGuard],
    data: {
      title: 'Profile'
    }
  }
];
