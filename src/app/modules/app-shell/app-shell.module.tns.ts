import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { componentDeclarations } from './app-shell.common';
import { UserMenuComponent } from './components/user-menu/user-menu.component.tns';
import { AppShellComponent } from './containers/app-shell/app-shell.component.tns';

const components = [UserMenuComponent];
const containers = [AppShellComponent];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    TNSFontIconModule,
    NativeScriptUISideDrawerModule,
    NativeScriptRouterModule
  ],
  declarations: [...componentDeclarations, ...containers, ...components],
  exports: [AppShellComponent],
  entryComponents: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppShellModule {}
