import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { ACCESS_TOKEN } from '@common/constants';
import { StorageService } from '@core/services/storage/storage.service';

import { RouterPayload } from '../models';
import { LoadSelf, Logout } from './actions';
import { Back, Forward, Go } from './actions/router.actions';
import * as fromCore from './reducers';
import * as fromSelectors from './selectors';

@Injectable()
export class CoreFacade {
  loggedIn$ = this.store.select(fromSelectors.getLoggedIn);
  self$ = this.store.select(fromSelectors.getSelf);
  unreadMessages$ = this.store.select(fromSelectors.getUnreadMessages);

  constructor(
    private store: Store<fromCore.CoreState>,
    private storageService: StorageService
  ) {
    if (this.storageService.getItem(ACCESS_TOKEN)) {
      this.store.dispatch(new LoadSelf());
    }
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
