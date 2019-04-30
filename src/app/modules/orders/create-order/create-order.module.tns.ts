import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIAutoCompleteTextViewModule } from 'nativescript-ui-autocomplete/angular';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';

import { CreateOrderFormComponent } from './components/create-order-form/create-order-form.component.tns';
import { CreateOrderRoutingModule } from './create-order-routing.module';
import {
  componentDeclarations,
  providerDeclarations
} from './create-order.common';

@NgModule({
  declarations: [...componentDeclarations, CreateOrderFormComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIDataFormModule,
    NativeScriptUIAutoCompleteTextViewModule,
    CreateOrderRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class CreateOrderModule {}
