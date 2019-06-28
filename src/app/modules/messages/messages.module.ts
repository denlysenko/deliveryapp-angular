import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { InfiniteScrollModule } from '@ui/infinite-scroll';

import { TooltipModule } from 'primeng/tooltip';

import { MessagesComponent } from './components/messages/messages.component';
import { importDeclarations } from './messages.common';
import { MessagesService } from './services/messages.service';
import { MessagesFacade } from './store';

export function messagesInitializer(messagesService: MessagesService) {
  return () => {
    messagesService.init();
  };
}

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    ...importDeclarations,
    InfiniteScrollModule,
    TooltipModule
  ],
  exports: [MessagesComponent],
  providers: [
    MessagesService,
    MessagesFacade,
    {
      provide: APP_INITIALIZER,
      useFactory: messagesInitializer,
      multi: true,
      deps: [MessagesService]
    }
  ]
})
export class MessagesModule {}
