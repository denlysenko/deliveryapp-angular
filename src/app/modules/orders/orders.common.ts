import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { components } from './components';
import { containers } from './containers';
import { OrdersResolver } from './resolvers/orders.resolver';
import { OrdersService } from './services/orders.service';
import { effects, OrdersFacade, reducer } from './store';

export const importDeclarations: any[] = [
  ReactiveFormsModule,
  StoreModule.forFeature('orders', reducer),
  EffectsModule.forFeature(effects)
];

export const componentDeclarations: any[] = [...containers, ...components];

export const providerDeclarations: any[] = [
  OrdersService,
  OrdersResolver,
  OrdersFacade
];
