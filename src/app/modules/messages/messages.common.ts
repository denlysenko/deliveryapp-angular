import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects } from './store/effects';
import { messagesReducer } from './store/reducers';

export const importDeclarations: any[] = [
  StoreModule.forFeature('messages', messagesReducer),
  EffectsModule.forFeature(effects)
];

export const componentDeclarations: any[] = [];

export const providerDeclarations: any[] = [];
