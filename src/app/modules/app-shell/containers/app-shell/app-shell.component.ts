import { Component } from '@angular/core';

import { CoreFacade } from '@core/store';

import { AppShellBase } from '../../base/AppShellBase';

@Component({
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent extends AppShellBase {
  showMessages = false;

  constructor(coreFacade: CoreFacade) {
    super(coreFacade);
  }
}
