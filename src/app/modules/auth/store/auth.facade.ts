import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthForm } from '../models';
import { Login, Register } from './actions/auth.actions';
import { AuthState } from './reducers';
import { getAuthError, getAuthLoading } from './selectors';

@Injectable()
export class AuthFacade {
  loading$ = this.store.select(getAuthLoading);
  error$ = this.store.select(getAuthError);

  constructor(private store: Store<AuthState>) {}

  login(formValue: AuthForm) {
    this.store.dispatch(new Login(formValue));
  }

  register(formValue: AuthForm) {
    this.store.dispatch(new Register(formValue));
  }
}
