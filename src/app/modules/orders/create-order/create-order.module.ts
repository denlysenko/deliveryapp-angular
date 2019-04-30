import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputMaskModule } from '@ui/inputmask';

import {
  AutoCompleteModule,
  ButtonModule,
  InputTextareaModule,
  InputTextModule,
  SpinnerModule,
  StepsModule
} from 'primeng/primeng';

import { CargoFormComponent } from './components/cargo-form/cargo-form.component';
import { CreateOrderFormComponent } from './components/create-order-form/create-order-form.component';
import { DestinationFormComponent } from './components/destination-form/destination-form.component';
import { SenderFormComponent } from './components/sender-form/sender-form.component';
import { CreateOrderRoutingModule } from './create-order-routing.module';
import {
  componentDeclarations,
  providerDeclarations
} from './create-order.common';

@NgModule({
  declarations: [
    ...componentDeclarations,
    CreateOrderFormComponent,
    CargoFormComponent,
    DestinationFormComponent,
    SenderFormComponent
  ],
  imports: [
    CommonModule,
    CreateOrderRoutingModule,
    ReactiveFormsModule,
    StepsModule,
    SpinnerModule,
    AutoCompleteModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    InputMaskModule
  ],
  providers: [...providerDeclarations]
})
export class CreateOrderModule {}
