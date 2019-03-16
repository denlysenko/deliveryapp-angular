import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { importDeclarations, providerDeclarations } from './orders.common';

@NgModule({
  imports: [CommonModule, OrdersRoutingModule, ...importDeclarations],
  providers: [...providerDeclarations]
})
export class OrdersModule {}
