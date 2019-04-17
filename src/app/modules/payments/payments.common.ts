import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { OrdersService } from '@orders/services/orders.service';

import { UsersService } from '@users/services/users.service';

import { PaymentsResolver } from './resolvers/payments.resolver';
import { PaymentsService } from './services/payments.service';
import { PaymentsFacade, paymentsReducer } from './store';

export const importDeclarations: any[] = [
  StoreModule.forFeature('payments', paymentsReducer),
  ReactiveFormsModule
];

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [
  PaymentsService,
  PaymentsFacade,
  PaymentsResolver,
  OrdersService,
  UsersService
];
