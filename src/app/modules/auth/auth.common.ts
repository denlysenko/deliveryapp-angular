import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthService } from './services/auth.service';
import { AuthFacade, authReducer, effects } from './store';

export const importDeclarations: any[] = [
  CommonModule,
  ReactiveFormsModule,
  StoreModule.forFeature('auth', authReducer),
  EffectsModule.forFeature(effects)
];

export const componentDeclarations: any[] = [AuthFormComponent];

export const providerDeclarations: any[] = [
  AuthService,
  AuthFacade,
  AuthenticatedGuard
];
