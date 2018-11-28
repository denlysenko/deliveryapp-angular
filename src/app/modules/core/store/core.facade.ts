import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { RouterPayload } from '../models';
import { Back, Forward, Go } from './actions/router.actions';
import * as fromCore from './reducers';

@Injectable()
export class CoreFacade {
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
