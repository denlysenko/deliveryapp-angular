import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { RouterPayload } from '../models';
import * as fromActions from './actions';
import * as fromCore from './reducers';

@Injectable({ providedIn: 'root' })
export class CoreFacade {
  constructor(private store: Store<fromCore.State>) {}

  navigate(payload: RouterPayload) {
    this.store.dispatch(new fromActions.Go(payload));
  }

  navigateBack() {
    this.store.dispatch(new fromActions.Back());
  }

  navigateForward() {
    this.store.dispatch(new fromActions.Forward());
  }
}
