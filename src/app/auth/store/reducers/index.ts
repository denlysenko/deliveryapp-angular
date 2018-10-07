import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromLogin from './login.reducer';
import * as fromMessages from './messages.reducer';
import * as fromRegister from './register.reducer';
import * as fromSelf from './self.reducer';

export interface AuthState {
  login: fromLogin.LoginState;
  register: fromRegister.RegisterState;
  self: fromSelf.SelfState;
  messages: fromMessages.MessageState;
}

export const reducers: ActionReducerMap<AuthState> = {
  login: fromLogin.reducer,
  register: fromRegister.reducer,
  self: fromSelf.reducer,
  messages: fromMessages.reducer
};

export const getAuthState = createFeatureSelector<AuthState>('auth');
