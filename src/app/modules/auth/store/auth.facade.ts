import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthForm } from '../models';
import { Login, Register } from './actions/auth.actions';
import { AuthFeatureState } from './reducers';
import * as fromSelectors from './selectors';

@Injectable()
export class AuthFacade {
  loading$ = this.store.select(fromSelectors.getAuthLoading);
  error$ = this.store.select(fromSelectors.getAuthError);

  constructor(private store: Store<AuthFeatureState>) {}

  login(formValue: AuthForm) {
    this.store.dispatch(new Login(formValue));
  }

  register(formValue: AuthForm) {
    this.store.dispatch(new Register(formValue));
  }
}
