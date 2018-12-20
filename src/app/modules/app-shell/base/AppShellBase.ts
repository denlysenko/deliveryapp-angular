import { BaseComponent } from '@base/BaseComponent';
import { CoreFacade } from '@core/store';

export abstract class AppShellBase extends BaseComponent {
  showMessages = false;
  user$ = this.coreFacade.self$;
  unreadMessages$ = this.coreFacade.unreadMessages$;
  messages$ = this.coreFacade.messages$;

  constructor(private coreFacade: CoreFacade) {
    super();
  }

  markMessageAsRead(id: string) {
    this.coreFacade.markMessageAsRead(id);
  }

  logout() {
    this.coreFacade.logout();
  }
}
