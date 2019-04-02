import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';

import { UpdateOrderFormComponent } from './components/update-order-form/update-order-form.component.tns';
import { UpdateOrderRoutingModule } from './update-order-routing.module';
import {
  componentDeclarations,
  providerDeclarations
} from './update-order.common';

@NgModule({
  declarations: [...componentDeclarations, UpdateOrderFormComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIDataFormModule,
    UpdateOrderRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class UpdateOrderModule {}
