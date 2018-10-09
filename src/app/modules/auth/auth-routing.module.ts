import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LoginPageComponent } from './containers/login-page/login-page.component';

export const routes: Route[] = [
  {
    path: 'login',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
