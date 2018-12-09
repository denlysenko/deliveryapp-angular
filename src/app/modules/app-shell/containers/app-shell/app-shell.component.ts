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

  constructor(private coreFacade: CoreFacade) {}

  logout() {
    this.coreFacade.logout();
  }
}
