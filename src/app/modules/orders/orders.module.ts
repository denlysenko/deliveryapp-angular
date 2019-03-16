import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';
import { providerDeclarations, importDeclarations } from './orders.common';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    ...importDeclarations
  ],
  providers: [...providerDeclarations]
})
export class OrdersModule {}
