import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule,
  PaginatorModule,
  SpinnerModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { PaymentsFilterComponent } from './components/payments-filter/payments-filter.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { PaymentsPageComponent } from './containers/payments-page/payments-page.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { importDeclarations, providerDeclarations } from './payments.common';

@NgModule({
  declarations: [
    PaymentsPageComponent,
    PaymentsListComponent,
    PaymentsFilterComponent,
    PaymentFormComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    ...importDeclarations,
    TableModule,
    PaginatorModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    SpinnerModule,
    CalendarModule,
    AutoCompleteModule
  ],
  providers: [...providerDeclarations]
})
export class PaymentsModule {}
