import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { LoginForm } from '../models';
import { Login } from './actions/auth.actions';
import { AuthFeatureState } from './reducers';
import * as fromSelectors from './selectors';

@Injectable()
export class AuthFacade {
  loading$ = this.store.select(fromSelectors.getAuthLoading);
  error$ = this.store.select(fromSelectors.getAuthError);

  constructor(private store: Store<AuthFeatureState>) {}

  login(creds: LoginForm) {
    this.store.dispatch(new Login(creds));
  }
}
