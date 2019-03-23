import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { registerElement } from 'nativescript-angular/element-registry';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { AuthRoutingModule } from './auth-routing.module';
import {
  componentDeclarations,
  importDeclarations,
  providerDeclarations
} from './auth.common';
import { AuthPageComponent } from './containers/auth-page/auth-page.component.tns';

const containers = [AuthPageComponent];

registerElement(
  'PreviousNextView',
  () => require('nativescript-iqkeyboardmanager').PreviousNextView
);

@NgModule({
  imports: [
    NativeScriptFormsModule,
    TNSFontIconModule,
    AuthRoutingModule,
    ...importDeclarations
  ],
  declarations: [...componentDeclarations, ...containers],
  providers: [...providerDeclarations],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule {}
