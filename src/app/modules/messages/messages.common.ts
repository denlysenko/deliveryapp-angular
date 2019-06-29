import { APP_INITIALIZER } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MessagesService } from './services';
import { MessagesFacade } from './store';
import { effects } from './store/effects';
import { messagesReducer } from './store/reducers';

export function messagesInitializer(messagesService: MessagesService) {
  return () => {
    messagesService.init();
  };
}

export const importDeclarations: any[] = [
  StoreModule.forFeature('messages', messagesReducer),
  EffectsModule.forFeature(effects)
];

export const providerDeclarations: any[] = [
  MessagesFacade,
  MessagesService,
  {
    provide: APP_INITIALIZER,
    useFactory: messagesInitializer,
    multi: true,
    deps: [MessagesService]
  }
];
