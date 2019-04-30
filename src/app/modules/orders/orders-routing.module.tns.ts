import { NgModule } from '@angular/core';

import { AuthGuard } from '@core/guards';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { OrdersPageComponent } from './orders-list/containers/orders-page/orders-page.component.tns';
import { OrdersResolver } from './orders-list/resolvers/orders.resolver';
import { routes } from './orders.routes';

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      {
        path: '',
        component: OrdersPageComponent,
        resolve: {
          orders: OrdersResolver
        },
        canActivate: [AuthGuard]
      },
      ...routes
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class OrdersRoutingModule {}
