import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { OrdersListComponent } from './components/orders-list/orders-list.component.tns';
import { OrdersRoutingModule } from './orders-routing.module';
import {
  componentDeclarations,
  importDeclarations,
  providerDeclarations
} from './orders.common';

@NgModule({
  imports: [
    OrdersRoutingModule,
    NativeScriptCommonModule,
    NativeScriptUIListViewModule,
    TNSFontIconModule,
    ...importDeclarations
  ],
  declarations: [...componentDeclarations, OrdersListComponent],
  providers: [...providerDeclarations],
  schemas: [NO_ERRORS_SCHEMA]
})
export class OrdersModule {}
