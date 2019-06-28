import { BaseComponent } from '@base/BaseComponent';
import { CoreFacade } from '@core/store';
import { MessagesFacade } from '@messages/store';

export abstract class AppShellBase extends BaseComponent {
  user$ = this.coreFacade.self$;
  unreadMessages$ = this.messagesFacade.unreadMessages$;
  messages$ = this.messagesFacade.messages$;
  messagesCount$ = this.messagesFacade.totalCount$;

  constructor(
    private coreFacade: CoreFacade,
    private messagesFacade: MessagesFacade
  ) {
    super();
  }

  markMessageAsRead(id: string) {
    this.messagesFacade.markMessageAsRead(id);
  }

  logout() {
    this.coreFacade.logout();
  }
}
