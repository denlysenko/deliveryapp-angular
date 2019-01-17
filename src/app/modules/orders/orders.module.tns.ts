import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { componentDeclarations, providerDeclarations } from './orders.common';
import { OrdersPageComponent } from './containers/orders-page/orders-page.component';

@NgModule({
  imports: [OrdersRoutingModule, NativeScriptCommonModule],
  declarations: [...componentDeclarations, OrdersPageComponent],
  providers: [...providerDeclarations],
  schemas: [NO_ERRORS_SCHEMA]
})
export class OrdersModule {}
