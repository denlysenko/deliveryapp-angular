import { createFeatureSelector } from '@ngrx/store';

import { AuthState } from './auth.reducer';

export { authReducer, AuthState } from './auth.reducer';
export const getAuthState = createFeatureSelector<AuthState>('auth');
