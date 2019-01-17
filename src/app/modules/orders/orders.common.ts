import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OrdersService } from './services/orders.service';
import { effects, reducer } from './store';

export const importDeclarations: any[] = [
  StoreModule.forFeature('orders', reducer),
  EffectsModule.forFeature(effects)
];

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [OrdersService];
