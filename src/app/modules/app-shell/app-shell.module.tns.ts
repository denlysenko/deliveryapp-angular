import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { componentDeclarations, importDeclarations } from './app-shell.common';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    TNSFontIconModule,
    NativeScriptUISideDrawerModule,
    ...importDeclarations
  ],
  declarations: [...componentDeclarations, UserMenuComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppShellModule {}
