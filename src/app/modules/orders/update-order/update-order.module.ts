import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputMaskModule } from '@ui/inputmask';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpinnerModule } from 'primeng/spinner';

import { UpdateOrderFormComponent } from './components/update-order-form/update-order-form.component';
import { UpdateOrderRoutingModule } from './update-order-routing.module';
import {
  componentDeclarations,
  providerDeclarations
} from './update-order.common';

@NgModule({
  declarations: [...componentDeclarations, UpdateOrderFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UpdateOrderRoutingModule,
    SpinnerModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    InputMaskModule
  ],
  providers: [...providerDeclarations]
})
export class UpdateOrderModule {}
