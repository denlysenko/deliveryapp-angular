import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { FilterChangeEvent, PageChangeEvent, SortingChangeEvent } from '@common/models';

import { FilterChange, PageChange, SortingChange } from './actions';
import { OrdersState } from './reducers';
import { getAllFilters, getError, getFilter, getLoading, getPagination, getSorting } from './selectors';

@Injectable()
export class OrdersFacade {
  loading$ = this.store.select(getLoading);
  error$ = this.store.select(getError);
  filter$ = this.store.select(getFilter);
  sorting$ = this.store.select(getSorting);
  pagination$ = this.store.select(getPagination);
  allFilters$ = this.store.select(getAllFilters);

  constructor(private store: Store<OrdersState>) {}

  doFiltering(filter: FilterChangeEvent) {
    this.store.dispatch(new FilterChange(filter));
  }

  sort(sorting: SortingChangeEvent) {
    this.store.dispatch(new SortingChange(sorting));
  }

  paginate(pagination: PageChangeEvent) {
    this.store.dispatch(new PageChange(pagination));
  }
}
