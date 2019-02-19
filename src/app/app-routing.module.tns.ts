import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AppShellComponent } from '@app-shell/containers/app-shell/app-shell.component.tns';

import { routes } from './app.routes';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
      {
        path: '',
        component: AppShellComponent,
        children: [...routes]
      }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
