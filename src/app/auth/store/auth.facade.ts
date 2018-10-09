import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { LoginForm } from '../models';
import * as fromActions from './actions';
import { AuthState } from './reducers';
import * as fromSelectors from './selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  loginLoading$ = this.store.select(fromSelectors.getLoginLoading);
  loginError$ = this.store.select(fromSelectors.getLoginError);

  constructor(private store: Store<AuthState>) {}

  login(creds: LoginForm) {
    this.store.dispatch(new fromActions.Login(creds));
  }
}
