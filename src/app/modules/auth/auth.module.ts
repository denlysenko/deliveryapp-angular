import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';

import { InputMaskModule } from '@ui/inputmask';
import { ButtonModule, InputTextModule } from 'primeng/primeng';

import { AuthRoutingModule } from './auth-routing.module';
import { componentDeclarations, importDeclarations, providerDeclarations } from './auth.common';
import { effects, MessagesEffects } from './store';

@NgModule({
  imports: [
    AuthRoutingModule,
    ...importDeclarations,
    EffectsModule.forFeature([...effects, MessagesEffects]),
    InputTextModule,
    ButtonModule,
    InputMaskModule
  ],
  declarations: [...componentDeclarations],
  providers: [...providerDeclarations]
})
export class AuthModule {}
