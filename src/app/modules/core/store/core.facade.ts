import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { RouterPayload } from '../models';
import { Back, Forward, Go } from './actions/router.actions';
import * as fromCore from './reducers';
import * as fromSelectors from './selectors';

@Injectable()
export class CoreFacade {
  loggedIn$ = this.store.select(fromSelectors.getLoggedIn);
  self$ = this.store.select(fromSelectors.getSelf);

  constructor(private store: Store<fromCore.CoreState>) {}

  navigate(payload: RouterPayload) {
    this.store.dispatch(new Go(payload));
  }

  navigateBack() {
    this.store.dispatch(new Back());
  }

  navigateForward() {
    this.store.dispatch(new Forward());
  }
}
