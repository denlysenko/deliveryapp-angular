import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { OrdersRoutingModule } from './orders-routing.module';
import { componentDeclarations, importDeclarations, providerDeclarations } from './orders.common';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ...importDeclarations,
    TableModule,
    PaginatorModule
  ],
  declarations: [...componentDeclarations],
  providers: [...providerDeclarations]
})
export class OrdersModule {}
