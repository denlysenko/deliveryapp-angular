import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputMaskModule } from '@ui/inputmask';

import {
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule,
  SpinnerModule
} from 'primeng/primeng';

import { UpdateOrderFormComponent } from './components/update-order-form/update-order-form.component';
import {
  componentDeclarations,
  providerDeclarations,
  routes
} from './update-order.common';

@NgModule({
  declarations: [...componentDeclarations, UpdateOrderFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
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
