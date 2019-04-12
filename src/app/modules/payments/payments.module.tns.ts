import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { providerDeclarations } from '../profile/profile.common';
import { importDeclarations } from './payments.common';

@NgModule({
  declarations: [],
  imports: [NativeScriptCommonModule, ...importDeclarations],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class PaymentsModule {}
