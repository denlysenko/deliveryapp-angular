import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AppShellComponent } from '@app-shell/containers/app-shell/app-shell.component.tns';

import { AuthGuard } from '@core/guards';

import { routes } from './app.routes';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
      {
        path: '',
        component: AppShellComponent,
        canActivate: [AuthGuard],
        children: [...routes]
      }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
