import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { componentDeclarations, importDeclarations } from './app-shell.common';

@NgModule({
  imports: [NativeScriptCommonModule, ...importDeclarations],
  declarations: [...componentDeclarations],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppShellModule {}
