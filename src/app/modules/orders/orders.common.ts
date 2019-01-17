import { StoreModule } from '@ngrx/store';

import { OrdersService } from './services/orders.service';
import { reducer } from './store/reducers';

export const importDeclarations: any[] = [
  StoreModule.forFeature('orders', reducer)
];

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [OrdersService];
