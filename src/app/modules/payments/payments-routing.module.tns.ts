import { NgModule } from '@angular/core';

import { AuthGuard } from '@core/guards';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PaymentPageComponent } from './containers/payment-page/payment-page.component.tns';
import { PaymentsPageComponent } from './containers/payments-page/payments-page.component.tns';
import { PaymentResolver } from './resolvers/payment.resolver';
import { PaymentsResolver } from './resolvers/payments.resolver';

@NgModule({
  imports: [
    NativeScriptRouterModule.forChild([
      {
        path: '',
        component: PaymentsPageComponent,
        resolve: {
          payments: PaymentsResolver
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'create',
        component: PaymentPageComponent,
        // TODO: add Roles guard
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: PaymentPageComponent,
        resolve: {
          payment: PaymentResolver
        },
        // TODO: add Roles guard
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class PaymentsRoutingModule {}
