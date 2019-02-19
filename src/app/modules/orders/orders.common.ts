import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UsersService } from '@users/services/users.service';

import { components } from './components';
import { containers } from './containers';
import { ClientsResolver } from './resolvers/clients.resolver';
import { OrdersResolver } from './resolvers/orders.resolver';
import { OrdersService } from './services/orders.service';
import { effects, OrdersFacade, ordersReducer } from './store';

export const importDeclarations: any[] = [
  ReactiveFormsModule,
  StoreModule.forFeature('orders', ordersReducer),
  EffectsModule.forFeature(effects)
];

export const componentDeclarations: any[] = [...containers, ...components];

export const providerDeclarations: any[] = [
  OrdersService,
  OrdersResolver,
  OrdersFacade,
  ClientsResolver,
  UsersService
];
