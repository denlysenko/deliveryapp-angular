import { Component } from '@angular/core';

import { CoreFacade } from '@core/store';

import { MessagesFacade } from '@messages/store';

import { AppShellBase } from '../../base/AppShellBase';

@Component({
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent extends AppShellBase {
  showMessages = false;

  constructor(coreFacade: CoreFacade, messagesFacade: MessagesFacade) {
    super(coreFacade, messagesFacade);
  }
}
