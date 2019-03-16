import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OrdersListModule } from './orders-list/orders-list.module';
import { effects, ordersReducer } from './store';
import { OrdersService } from './services/orders.service';

export const importDeclarations: any[] = [
  StoreModule.forFeature('orders', ordersReducer),
  EffectsModule.forFeature(effects),
  OrdersListModule
];

export const providerDeclarations: any[] = [OrdersService];
