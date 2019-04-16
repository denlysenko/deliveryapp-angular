import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards';

import { PaymentsPageComponent } from './containers/payments-page/payments-page.component';
import { PaymentsResolver } from './resolvers/payments.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
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
  exports: [RouterModule]
})
export class PaymentsRoutingModule {}
