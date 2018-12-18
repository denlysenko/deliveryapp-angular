import { Component, ViewChild } from '@angular/core';

import { CoreFacade } from '@core/store';
import { DrawerTransitionBase, PushTransition } from 'nativescript-ui-sidedrawer';
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-ui-sidedrawer/angular';
import * as application from 'tns-core-modules/application';
import { isIOS } from 'tns-core-modules/platform';

import { AppShellBase } from '../../base';

@Component({
  moduleId: module.id,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent extends AppShellBase {
  @ViewChild('drawer')
  drawerComponent: RadSideDrawerComponent;

  private _sideDrawerTransition: DrawerTransitionBase;

  private get drawer(): SideDrawerType {
    return this.drawerComponent.sideDrawer;
  }

  constructor(coreFacade: CoreFacade) {
    super(coreFacade);
    // iPhone X fix height
    if (
      isIOS &&
      application.ios.window.safeAreaInsets &&
      application.ios.window.safeAreaInsets.bottom > 0
    ) {
      application.addCss(`
        .drawer { margin-bottom: -${
          application.ios.window.safeAreaInsets.bottom
        } }
      `);
    }

    this._sideDrawerTransition = new PushTransition();
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  onDrawerButtonTap() {
    this.drawer.toggleDrawerState();
  }
}
