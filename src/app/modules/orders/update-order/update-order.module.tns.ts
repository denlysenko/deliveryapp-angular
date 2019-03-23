import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptUIDataFormModule } from 'nativescript-ui-dataform/angular';

import { OrdersService } from '../services/orders.service';
import { UpdateOrderFormComponent } from './components/update-order-form/update-order-form.component.tns';
import {
  componentDeclarations,
  providerDeclarations,
  routes
} from './update-order.common';

@NgModule({
  declarations: [...componentDeclarations, UpdateOrderFormComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    NativeScriptUIDataFormModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations, OrdersService]
})
export class UpdateOrderModule {}
