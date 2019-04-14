import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  ButtonModule,
  DropdownModule,
  InputTextModule,
  PaginatorModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { PaymentsFilterComponent } from './components/payments-filter/payments-filter.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { PaymentsPageComponent } from './containers/payments-page/payments-page.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { importDeclarations, providerDeclarations } from './payments.common';

@NgModule({
  declarations: [
    PaymentsPageComponent,
    PaymentsListComponent,
    PaymentsFilterComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    ...importDeclarations,
    TableModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  providers: [...providerDeclarations]
})
export class PaymentsModule {}
