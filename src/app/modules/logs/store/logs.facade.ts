import { Injectable } from '@angular/core';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { select, Store } from '@ngrx/store';

import { FilterChange, PageChange, SortingChange } from './actions';
import { LogsState } from './reducers';
import {
  getAllFilters,
  getFilter,
  getPagination,
  getSorting
} from './selectors';

@Injectable()
export class LogsFacade {
  filter$ = this.store.pipe(select(getFilter));
  sorting$ = this.store.pipe(select(getSorting));
  pagination$ = this.store.pipe(select(getPagination));
  allFilters$ = this.store.pipe(select(getAllFilters));

  constructor(private readonly store: Store<LogsState>) {}

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
