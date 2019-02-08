import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AuthPageComponent } from './containers/auth-page/auth-page.component.tns';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
      {
        path: 'auth',
        component: AuthPageComponent,
        canActivate: [AuthenticatedGuard]
      }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule {}
