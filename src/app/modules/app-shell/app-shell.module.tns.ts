import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { componentDeclarations } from './app-shell.common';

@NgModule({
  declarations: [...componentDeclarations],
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppShellModule {}
