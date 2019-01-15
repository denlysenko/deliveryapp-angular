import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  imports: [OrdersRoutingModule, NativeScriptCommonModule],
  declarations: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class OrdersModule {}
