import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { MessagesService } from './services/messages.service';

export function messagesInitializer(messagesService: MessagesService) {
  return () => {
    messagesService.init();
  };
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    MessagesService,
    {
      provide: APP_INITIALIZER,
      useFactory: messagesInitializer,
      multi: true,
      deps: [MessagesService]
    }
  ]
})
export class MessagesModule {}
