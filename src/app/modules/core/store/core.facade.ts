import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { RouterPayload } from '../models';
import { LoadMessages, LoadSelf, Logout, MarkAsRead } from './actions';
import { Back, Forward, Go } from './actions/router.actions';
import { CoreState } from './reducers';
import { getAllMessages, getLoggedIn, getSelf, getSelfRole, getUnreadMessages } from './selectors';

@Injectable()
export class CoreFacade {
  loggedIn$ = this.store.select(getLoggedIn);
  self$ = this.store.select(getSelf);
  role$ = this.store.select(getSelfRole);
  unreadMessages$ = this.store.select(getUnreadMessages);
  messages$ = this.store.select(getAllMessages);

  constructor(private store: Store<CoreState>) {}

  loadSelf() {
    this.store.dispatch(new LoadSelf());
  }

  loadMessages() {
    this.store.dispatch(new LoadMessages());
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
