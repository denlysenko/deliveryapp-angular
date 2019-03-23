import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';

import { CreateOrderFormComponent } from './components/create-order-form/create-order-form.component.tns';
import {
  componentDeclarations,
  providerDeclarations,
  routes
} from './create-order.common';

@NgModule({
  declarations: [...componentDeclarations, CreateOrderFormComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    NativeScriptUIDataFormModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class CreateOrderModule {}
