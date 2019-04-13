import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentsPageComponent } from './containers/payments-page/payments-page.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { importDeclarations, providerDeclarations } from './payments.common';

@NgModule({
  declarations: [PaymentsPageComponent],
  imports: [CommonModule, PaymentsRoutingModule, ...importDeclarations],
  providers: [...providerDeclarations]
})
export class PaymentsModule {}
