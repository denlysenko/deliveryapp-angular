import { Injectable } from '@angular/core';

import {
  FilterChangeEvent,
  PageChangeEvent,
  SortingChangeEvent
} from '@common/models';

import { select, Store } from '@ngrx/store';

import { Payment } from '../models';
import {
  FilterChange,
  PageChange,
  ReloadPayments,
  SelectPayment,
  SortingChange
} from './actions';
import { PaymentsState } from './reducers';
import {
  getAllFilters,
  getCurrent,
  getFilter,
  getPagination,
  getSorting
} from './selectors';

@Injectable()
export class PaymentsFacade {
  current$ = this.store.pipe(select(getCurrent));
  filter$ = this.store.pipe(select(getFilter));
  sorting$ = this.store.pipe(select(getSorting));
  pagination$ = this.store.pipe(select(getPagination));
  allFilters$ = this.store.pipe(select(getAllFilters));

  constructor(private store: Store<PaymentsState>) {}

  doFiltering(filter: FilterChangeEvent) {
    this.store.dispatch(new FilterChange(filter));
  }

  sort(sorting: SortingChangeEvent) {
    this.store.dispatch(new SortingChange(sorting));
  }

  paginate(pagination: PageChangeEvent) {
    this.store.dispatch(new PageChange(pagination));
  }

  select(payment: Payment) {
    this.store.dispatch(new SelectPayment(payment));
  }

  reload() {
    this.store.dispatch(new ReloadPayments());
  }
}
