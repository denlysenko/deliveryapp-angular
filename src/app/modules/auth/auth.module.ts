import { NgModule } from '@angular/core';

import { InputMaskModule } from '@ui/inputmask';
import { ButtonModule, InputTextModule } from 'primeng/primeng';

import { AuthRoutingModule } from './auth-routing.module';
import {
  componentDeclarations,
  importDeclarations,
  providerDeclarations
} from './auth.common';

@NgModule({
  imports: [
    AuthRoutingModule,
    ...importDeclarations,
    InputTextModule,
    ButtonModule,
    InputMaskModule
  ],
  declarations: [...componentDeclarations],
  providers: [...providerDeclarations]
})
export class AuthModule {}
