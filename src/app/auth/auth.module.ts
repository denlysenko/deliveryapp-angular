import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ButtonModule, InputTextModule } from 'primeng/primeng';

import { AuthRoutingModule } from './auth-routing.module';
import { components } from './components';
import { containers } from './containers';
import { AuthService } from './services/auth.service';
import { effects, reducers } from './store';
import { AuthFacade } from './store/auth.facade';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects),
    InputTextModule,
    ButtonModule
  ],
  declarations: [...containers, ...components],
  providers: [AuthService, AuthFacade]
})
export class AuthModule {}
