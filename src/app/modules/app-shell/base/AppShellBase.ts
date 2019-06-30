import { BaseComponent } from '@base/BaseComponent';

import { CoreFacade } from '@core/store';

import { MessagesFacade } from '@messages/store';

export abstract class AppShellBase extends BaseComponent {
  user$ = this.coreFacade.self$;
  unreadMessages$ = this.messagesFacade.unreadMessages$;

  constructor(
    private coreFacade: CoreFacade,
    private messagesFacade: MessagesFacade
  ) {
    super();
  }

  logout() {
    this.coreFacade.logout();
  }
}
