import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { providerDeclarations } from './orders.common';

@NgModule({
  imports: [OrdersRoutingModule, NativeScriptCommonModule],
  declarations: [],
  providers: [...providerDeclarations],
  schemas: [NO_ERRORS_SCHEMA]
})
export class OrdersModule {}
