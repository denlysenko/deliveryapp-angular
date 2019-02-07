import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

import { componentDeclarations, importDeclarations } from './app-shell.common';
import { MessagesComponent } from './components/messages/messages.component.tns';
import { UserMenuComponent } from './components/user-menu/user-menu.component.tns';
import { AppShellComponent } from './containers/app-shell/app-shell.component.tns';

const components = [MessagesComponent, UserMenuComponent];
const containers = [AppShellComponent];

@NgModule({
  imports: [
    NativeScriptCommonModule,
    TNSFontIconModule,
    NativeScriptUISideDrawerModule,
    ...importDeclarations
  ],
  declarations: [...componentDeclarations, ...containers, ...components],
  entryComponents: [MessagesComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppShellModule {}
