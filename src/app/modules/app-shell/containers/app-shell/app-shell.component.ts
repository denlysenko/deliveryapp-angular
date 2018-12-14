import { Component } from '@angular/core';

import { CoreFacade } from '@core/store';

@Component({
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent {
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
