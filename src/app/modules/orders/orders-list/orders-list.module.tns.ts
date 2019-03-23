import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { OrdersFilterComponent } from './components/orders-filter/orders-filter.component.tns';
import { OrdersListComponent } from './components/orders-list/orders-list.component.tns';
import {
  componentDeclarations,
  importDeclarations,
  providerDeclarations
} from './orders-list.common';

@NgModule({
  declarations: [
    ...componentDeclarations,
    OrdersListComponent,
    OrdersFilterComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptUIListViewModule,
    TNSFontIconModule,
    ...importDeclarations
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations],
  entryComponents: [OrdersFilterComponent]
})
export class OrdersListModule {}
