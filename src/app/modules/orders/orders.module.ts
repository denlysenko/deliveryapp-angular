import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule, DropdownModule, InputTextModule, PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { OrdersRoutingModule } from './orders-routing.module';
import { componentDeclarations, importDeclarations, providerDeclarations } from './orders.common';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ...importDeclarations,
    TableModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  declarations: [...componentDeclarations],
  providers: [...providerDeclarations]
})
export class OrdersModule {}
