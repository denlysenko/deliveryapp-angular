import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as fromMessages from './messages.reducer';
import * as fromSelf from './self.reducer';

export interface AuthFeatureState {
  auth: fromAuth.AuthState;
  self: fromSelf.SelfState;
  messages: fromMessages.MessageState;
}

export const reducers: ActionReducerMap<AuthFeatureState> = {
  auth: fromAuth.reducer,
  self: fromSelf.reducer,
  messages: fromMessages.reducer
};

export const getAuthState = createFeatureSelector<AuthFeatureState>('auth');
