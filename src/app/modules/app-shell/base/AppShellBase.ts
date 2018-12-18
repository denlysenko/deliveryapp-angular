import { CoreFacade } from '@core/store';

export abstract class AppShellBase {
  showMessages = false;
  user$ = this.coreFacade.self$;
  unreadMessages$ = this.coreFacade.unreadMessages$;
  messages$ = this.coreFacade.messages$;

  constructor(private coreFacade: CoreFacade) {}

  markMessageAsRead(id: string) {
    this.coreFacade.markMessageAsRead(id);
  }

  logout() {
    this.coreFacade.logout();
  }
}
