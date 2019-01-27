import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { components } from './components';
import { containers } from './containers';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './services/auth.service';
import { AuthFacade, authReducer, effects } from './store';

export const importDeclarations: any[] = [
  CommonModule,
  ReactiveFormsModule,
  StoreModule.forFeature('auth', authReducer),
  EffectsModule.forFeature(effects)
];

export const componentDeclarations: any[] = [...containers, ...components];

export const providerDeclarations: any[] = [
  AuthService,
  AuthFacade,
  AuthenticatedGuard
];
