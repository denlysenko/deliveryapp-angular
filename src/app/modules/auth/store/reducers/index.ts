import { createFeatureSelector } from '@ngrx/store';

import { AuthState } from './auth.reducer';

export { reducer, AuthState } from './auth.reducer';
export const getAuthState = createFeatureSelector<AuthState>('auth');
