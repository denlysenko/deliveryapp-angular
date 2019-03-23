import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { importDeclarations, providerDeclarations } from './orders.common';

@NgModule({
  imports: [OrdersRoutingModule, ...importDeclarations],
  providers: [...providerDeclarations],
  schemas: [NO_ERRORS_SCHEMA]
})
export class OrdersModule {}
