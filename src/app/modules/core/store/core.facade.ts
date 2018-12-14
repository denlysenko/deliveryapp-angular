import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { RouterPayload } from '../models';
import { LoadSelf, Logout, MarkAsRead } from './actions';
import { Back, Forward, Go } from './actions/router.actions';
import * as fromCore from './reducers';
import * as fromSelectors from './selectors';

@Injectable()
export class CoreFacade {
  loggedIn$ = this.store.select(fromSelectors.getLoggedIn);
  self$ = this.store.select(fromSelectors.getSelf);
  unreadMessages$ = this.store.select(fromSelectors.getUnreadMessages);
  messages$ = this.store.select(fromSelectors.getAllMessages);

  constructor(private store: Store<fromCore.CoreState>) {}

  loadSelf() {
    this.store.dispatch(new LoadSelf());
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

  markMessageAsRead(id: string) {
    this.store.dispatch(new MarkAsRead(id));
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
