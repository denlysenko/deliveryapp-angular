import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputMaskModule } from '@ui/inputmask';

import {
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule,
  PaginatorModule,
  SpinnerModule,
  StepsModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { OrdersFilterComponent } from './components/orders-filter/orders-filter.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrdersRoutingModule } from './orders-routing.module';
import {
  componentDeclarations,
  importDeclarations,
  providerDeclarations
} from './orders.common';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ...importDeclarations,
    TableModule,
    PaginatorModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    StepsModule,
    CalendarModule,
    SpinnerModule,
    InputMaskModule
  ],
  declarations: [
    ...componentDeclarations,
    OrdersListComponent,
    OrdersFilterComponent
  ],
  providers: [...providerDeclarations]
})
export class OrdersModule {}
