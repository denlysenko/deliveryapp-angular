import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { importDeclarations } from './orders.common';

@NgModule({
  imports: [CommonModule, OrdersRoutingModule, ...importDeclarations],
  declarations: []
})
export class OrdersModule {}
