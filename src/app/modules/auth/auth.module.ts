import { NgModule } from '@angular/core';

import { InputMaskModule } from '@ui/inputmask';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AuthRoutingModule } from './auth-routing.module';
import {
  componentDeclarations,
  importDeclarations,
  providerDeclarations
} from './auth.common';
import { AuthPageComponent } from './containers/auth-page/auth-page.component';

const containers = [AuthPageComponent];

@NgModule({
  imports: [
    AuthRoutingModule,
    ...importDeclarations,
    InputTextModule,
    ButtonModule,
    InputMaskModule
  ],
  declarations: [...componentDeclarations, ...containers],
  providers: [...providerDeclarations]
})
export class AuthModule {}
