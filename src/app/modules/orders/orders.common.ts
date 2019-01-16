import { StoreModule } from '@ngrx/store';

import { reducer } from './store/reducers';

export const importDeclarations: any[] = [
  StoreModule.forFeature('orders', reducer)
];

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [];
