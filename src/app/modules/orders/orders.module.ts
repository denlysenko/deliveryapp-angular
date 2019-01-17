import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { OrdersRoutingModule } from './orders-routing.module';
import { componentDeclarations, importDeclarations, providerDeclarations } from './orders.common';
import { OrdersPageComponent } from './containers/orders-page/orders-page.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ...importDeclarations,
    TableModule,
    PaginatorModule
  ],
  declarations: [...componentDeclarations, OrdersPageComponent],
  providers: [...providerDeclarations]
})
export class OrdersModule {}
