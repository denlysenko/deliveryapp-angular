import { createFeatureSelector } from '@ngrx/store';

import { OrdersState } from './orders.reducer';

export { reducer, OrdersState } from './orders.reducer';
export const getOrdersState = createFeatureSelector<OrdersState>('orders');
