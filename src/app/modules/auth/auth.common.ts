import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { components } from './components';
import { containers } from './containers';
import { AuthService } from './services/auth.service';
import { reducers } from './store';
import { AuthFacade } from './store/auth.facade';

export const importDeclarations: any[] = [
  CommonModule,
  ReactiveFormsModule,
  StoreModule.forFeature('auth', reducers)
];

export const componentDeclarations: any[] = [...containers, ...components];

export const providerDeclarations: any[] = [AuthService, AuthFacade];
