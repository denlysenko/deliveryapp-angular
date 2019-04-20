import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { PaymentsFilterComponent } from './components/payments-filter/payments-filter.component.tns';
import { PaymentsListComponent } from './components/payments-list/payments-list.component.tns';
import { PaymentsPageComponent } from './containers/payments-page/payments-page.component.tns';
import { PaymentsRoutingModule } from './payments-routing.module';
import { importDeclarations, providerDeclarations } from './payments.common';

@NgModule({
  declarations: [
    PaymentsPageComponent,
    PaymentsListComponent,
    PaymentsFilterComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptUIListViewModule,
    TNSFontIconModule,
    PaymentsRoutingModule,
    ...importDeclarations
  ],
  schemas: [NO_ERRORS_SCHEMA],
  entryComponents: [PaymentsFilterComponent],
  providers: [...providerDeclarations]
})
export class PaymentsModule {}
