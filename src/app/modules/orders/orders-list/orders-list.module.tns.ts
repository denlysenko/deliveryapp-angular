import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { OrdersFilterComponent } from './components/orders-filter/orders-filter.component.tns';
import { OrdersListComponent } from './components/orders-list/orders-list.component.tns';
import { OrdersPageComponent } from './containers/orders-page/orders-page.component.tns';
import { importDeclarations, providerDeclarations } from './orders-list.common';

@NgModule({
  declarations: [
    OrdersPageComponent,
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
  providers: [...providerDeclarations]
})
export class OrdersListModule {}
