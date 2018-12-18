import { Component } from '@angular/core';

import { CoreFacade } from '@core/store';

import { AppShellBase } from '../../base';

@Component({
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent extends AppShellBase {
  constructor(coreFacade: CoreFacade) {
    super(coreFacade);
  }
}
