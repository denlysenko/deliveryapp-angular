import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { routes } from './app.routes';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
