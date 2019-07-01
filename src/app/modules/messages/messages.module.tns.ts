import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { MessagesComponent } from './components/messages/messages.component.tns';
import { importDeclarations, providerDeclarations } from './messages.common';

@NgModule({
  declarations: [MessagesComponent],
  imports: [NativeScriptCommonModule, ...importDeclarations],
  exports: [MessagesComponent],
  entryComponents: [MessagesComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...providerDeclarations]
})
export class MessagesModule {}
