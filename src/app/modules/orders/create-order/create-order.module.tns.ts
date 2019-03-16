import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import {
  componentDeclarations,
  providerDeclarations,
  routes
} from './create-order.common';
import { OrdersFacade } from '../store';

@NgModule({
  declarations: [...componentDeclarations],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class CreateOrderModule {}
