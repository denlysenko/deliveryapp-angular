import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';

import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { AuthRoutingModule } from './auth-routing.module';
import { componentDeclarations, importDeclarations, providerDeclarations } from './auth.common';
import { effects } from './store';

@NgModule({
  imports: [
    NativeScriptFormsModule,
    TNSFontIconModule,
    AuthRoutingModule,
    ...importDeclarations,
    EffectsModule.forFeature(effects)
  ],
  declarations: [...componentDeclarations],
  providers: [...providerDeclarations]
})
export class AuthModule {}
