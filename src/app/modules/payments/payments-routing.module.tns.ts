import { NgModule } from '@angular/core';

import { Roles } from '@common/enums';

import { AuthGuard, RolesGuard } from '@core/guards';

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
        canActivate: [AuthGuard, RolesGuard],
        data: {
          allowedRoles: [Roles.MANAGER, Roles.ADMIN]
        }
      },
      {
        path: ':id',
        component: PaymentPageComponent,
        resolve: {
          payment: PaymentResolver
        },
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class PaymentsRoutingModule {}
