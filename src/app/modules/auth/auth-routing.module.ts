import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthPageComponent } from './containers/auth-page/auth-page.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'auth',
        component: AuthPageComponent,
        canActivate: [AuthenticatedGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
