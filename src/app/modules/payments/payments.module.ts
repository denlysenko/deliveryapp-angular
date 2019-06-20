import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserViewModule } from '@user-view/user-view.module';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { SpinnerModule } from 'primeng/spinner';
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
    AutoCompleteModule,
    UserViewModule
  ],
  providers: [...providerDeclarations]
})
export class PaymentsModule {}
