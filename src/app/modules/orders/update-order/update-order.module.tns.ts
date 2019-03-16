import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { OrdersService } from '../services/orders.service';
import { OrdersFacade } from '../store';
import {
  componentDeclarations,
  importDeclarations,
  providerDeclarations,
  routes
} from './update-order.common';

@NgModule({
  declarations: [...componentDeclarations],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    ...importDeclarations
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations, OrdersService, OrdersFacade]
})
export class UpdateOrderModule {}
