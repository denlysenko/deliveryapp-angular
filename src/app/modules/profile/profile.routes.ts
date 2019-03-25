import { Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { ProfilePageComponent } from './containers/profile-page/profile-page.component';
import { ProfileResolver } from './resolvers/profile.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    resolve: {
      profile: ProfileResolver
    },
    canActivate: [AuthGuard],
    data: {
      title: 'Profile'
    }
  }
];
