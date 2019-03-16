import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OrdersListModule } from './orders-list/orders-list.module';
import { OrdersService } from './services/orders.service';
import { effects, OrdersFacade, ordersReducer } from './store';

export const importDeclarations: any[] = [
  StoreModule.forFeature('orders', ordersReducer),
  EffectsModule.forFeature(effects),
  OrdersListModule
];

export const providerDeclarations: any[] = [OrdersService, OrdersFacade];
