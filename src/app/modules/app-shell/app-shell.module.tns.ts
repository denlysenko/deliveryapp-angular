import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { componentDeclarations, importDeclarations } from './app-shell.common';

@NgModule({
  imports: [NativeScriptCommonModule, TNSFontIconModule, ...importDeclarations],
  declarations: [...componentDeclarations],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppShellModule {}
