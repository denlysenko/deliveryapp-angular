import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule, PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { OrdersPageComponent } from './containers/orders-page/orders-page.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { componentDeclarations, importDeclarations, providerDeclarations } from './orders.common';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ...importDeclarations,
    TableModule,
    PaginatorModule,
    ButtonModule
  ],
  declarations: [...componentDeclarations, OrdersPageComponent],
  providers: [...providerDeclarations]
})
export class OrdersModule {}
