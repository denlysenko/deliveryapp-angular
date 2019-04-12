import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PaymentsService } from './services/payments.service';
import { effects, PaymentsFacade, paymentsReducer } from './store';

export const importDeclarations: any[] = [
  StoreModule.forFeature('payments', paymentsReducer),
  EffectsModule.forFeature(effects)
];

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [PaymentsService, PaymentsFacade];
