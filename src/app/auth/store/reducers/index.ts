import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromLogin from './login.reducer';
import * as fromMessages from './messages.reducer';
import * as fromRegister from './register.reducer';
import * as fromUser from './user.reducer';

export interface AuthState {
  login: fromLogin.LoginState;
  register: fromRegister.RegisterState;
  user: fromUser.UserState;
  messages: fromMessages.MessageState;
}

export const reducers: ActionReducerMap<AuthState> = {
  login: fromLogin.reducer,
  register: fromRegister.reducer,
  user: fromUser.reducer,
  messages: fromMessages.reducer
};

export const getAuthState = createFeatureSelector<AuthState>('auth');
