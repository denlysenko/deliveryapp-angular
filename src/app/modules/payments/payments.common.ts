import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PaymentsResolver } from './resolvers/payments.resolver';
import { PaymentsService } from './services/payments.service';
import { effects, PaymentsFacade, paymentsReducer } from './store';

export const importDeclarations: any[] = [
  StoreModule.forFeature('payments', paymentsReducer),
  EffectsModule.forFeature(effects),
  ReactiveFormsModule
];

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [
  PaymentsService,
  PaymentsFacade,
  PaymentsResolver
];
