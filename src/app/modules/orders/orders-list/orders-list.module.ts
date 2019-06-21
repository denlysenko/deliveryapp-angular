import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserViewModule } from '@user-view/user-view.module';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
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
    DropdownModule,
    UserViewModule
  ],
  providers: [...providerDeclarations]
})
export class OrdersListModule {}
