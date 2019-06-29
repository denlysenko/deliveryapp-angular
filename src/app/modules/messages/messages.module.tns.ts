import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { importDeclarations, providerDeclarations } from './messages.common';

@NgModule({
  declarations: [],
  imports: [NativeScriptCommonModule, ...importDeclarations],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class MessagesModule {}
