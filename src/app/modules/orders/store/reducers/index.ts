import { createFeatureSelector } from '@ngrx/store';

import { OrdersState } from './orders.reducer';

export { ordersReducer, OrdersState } from './orders.reducer';
export const getOrdersState = createFeatureSelector<OrdersState>('orders');
