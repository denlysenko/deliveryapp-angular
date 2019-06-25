import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { importDeclarations } from './messages.common';
import { MessagesService } from './services/messages.service';
import { MessagesFacade } from './store';

export function messagesInitializer(messagesService: MessagesService) {
  return () => {
    messagesService.init();
  };
}

@NgModule({
  declarations: [],
  imports: [CommonModule, ...importDeclarations],
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
