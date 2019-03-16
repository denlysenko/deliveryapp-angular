import { NgModule } from '@angular/core';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AppShellComponent } from '@app-shell/containers/app-shell/app-shell.component.tns';

import { routes } from './app.routes';
import { AuthGuard } from '@core/guards';

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot([
      {
        path: '',
        component: AppShellComponent,
        children: [...routes]
      },
      {
        path: 'orders/create',
        loadChildren:
          './modules/orders/create-order/create-order.module#CreateOrderModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'orders/:id',
        loadChildren:
          './modules/orders/update-order/update-order.module#UpdateOrderModule',
        canLoad: [AuthGuard]
      }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
