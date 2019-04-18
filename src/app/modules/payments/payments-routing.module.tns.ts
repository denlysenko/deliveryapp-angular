import { NgModule } from '@angular/core';

import { AuthGuard } from '@core/guards';

import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PaymentsPageComponent } from './containers/payments-page/payments-page.component.tns';
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
      }
    ])
  ],
  exports: [NativeScriptRouterModule]
})
export class PaymentsRoutingModule {}
