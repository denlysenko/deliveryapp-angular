import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { User } from '@users/models';

import { filter } from 'rxjs/operators';

import { RouterPayload } from '../models';
import { LoadSelf, LoadSelfSuccess, Logout } from './actions';
import { Back, Forward, Go } from './actions/router.actions';
import { CoreState } from './reducers';
import { getLoggedIn, getSelf, getSelfRole } from './selectors';

@Injectable()
export class CoreFacade {
  loggedIn$ = this.store.pipe(select(getLoggedIn));
  self$ = this.store.pipe(
    select(getSelf),
    filter((user) => !!user)
  );
  role$ = this.store.pipe(select(getSelfRole));

  constructor(private store: Store<CoreState>) {}

  loadSelf() {
    this.store.dispatch(new LoadSelf());
  }

  updateSelf(user: User) {
    this.store.dispatch(new LoadSelfSuccess(user));
  }

  navigate(payload: RouterPayload) {
    this.store.dispatch(new Go(payload));
  }

  navigateBack() {
    this.store.dispatch(new Back());
  }

  navigateForward() {
    this.store.dispatch(new Forward());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
