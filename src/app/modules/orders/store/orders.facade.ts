import { Injectable } from '@angular/core';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { select, Store } from '@ngrx/store';

import { Order } from '../models';
import {
  CreateOrder,
  FilterChange,
  PageChange,
  SortingChange
} from './actions';
import { OrdersState } from './reducers';
import {
  getAllFilters,
  getError,
  getFilter,
  getLoading,
  getPagination,
  getSorting
} from './selectors';

@Injectable()
export class OrdersFacade {
  loading$ = this.store.pipe(select(getLoading));
  error$ = this.store.pipe(select(getError));
  filter$ = this.store.pipe(select(getFilter));
  sorting$ = this.store.pipe(select(getSorting));
  pagination$ = this.store.pipe(select(getPagination));
  allFilters$ = this.store.pipe(select(getAllFilters));

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

  create(order: Order) {
    this.store.dispatch(new CreateOrder(order));
  }
}
