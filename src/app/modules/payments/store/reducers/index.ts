import { createFeatureSelector } from '@ngrx/store';

import { PaymentsState } from './payments.reducer';

export { paymentsReducer, PaymentsState } from './payments.reducer';
export const getPaymentsState = createFeatureSelector<PaymentsState>(
  'payments'
);
