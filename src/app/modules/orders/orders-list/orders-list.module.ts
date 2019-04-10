import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ButtonModule,
  DropdownModule,
  InputTextModule,
  PaginatorModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { OrdersFilterComponent } from './components/orders-filter/orders-filter.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrdersPageComponent } from './containers/orders-page/orders-page.component';
import { importDeclarations, providerDeclarations } from './orders-list.common';

@NgModule({
  declarations: [
    OrdersPageComponent,
    OrdersFilterComponent,
    OrdersListComponent
  ],
  imports: [
    CommonModule,
    ...importDeclarations,
    RouterModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  providers: [...providerDeclarations]
})
export class OrdersListModule {}
