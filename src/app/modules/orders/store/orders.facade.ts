import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { PageChangeEvent, SortingChangeEvent } from '@common/models';

import { PageChange, SortingChange } from './actions';
import { OrdersState } from './reducers';
import { getError, getFilter, getLoading, getPagination, getSorting } from './selectors';

@Injectable()
export class OrdersFacade {
  loading$ = this.store.select(getLoading);
  error$ = this.store.select(getError);
  filter$ = this.store.select(getFilter);
  sorting$ = this.store.select(getSorting);
  pagination$ = this.store.select(getPagination);

  constructor(private store: Store<OrdersState>) {}

  sort(sorting: SortingChangeEvent) {
    this.store.dispatch(new SortingChange(sorting));
  }

  paginate(pagination: PageChangeEvent) {
    this.store.dispatch(new PageChange(pagination));
  }
}
