import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { CoreFacade } from '@core/store';
import {
  ModalDialogOptions,
  ModalDialogService
} from 'nativescript-angular/modal-dialog';
import {
  DrawerTransitionBase,
  SlideAlongTransition
} from 'nativescript-ui-sidedrawer';
import {
  RadSideDrawerComponent,
  SideDrawerType
} from 'nativescript-ui-sidedrawer/angular';
import * as application from 'tns-core-modules/application';
import { isIOS } from 'tns-core-modules/platform';

import { AppShellBase } from '../../base/AppShellBase';
import { MessagesComponent } from '../../components/messages/messages.component';

@Component({
  moduleId: module.id,
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent extends AppShellBase {
  selectedPageTitle: string;

  @ViewChild('drawer')
  drawerComponent: RadSideDrawerComponent;

  private _sideDrawerTransition: DrawerTransitionBase;

  private get drawer(): SideDrawerType {
    return this.drawerComponent.sideDrawer;
  }

  constructor(
    coreFacade: CoreFacade,
    private router: Router,
    private route: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService
  ) {
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

    this._sideDrawerTransition = new SlideAlongTransition();

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(e => {
      if (e instanceof NavigationEnd && this.drawer) {
        this.drawer.closeDrawer();
        this.updateRouteTitle();
      }
    });
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  onDrawerButtonTap() {
    this.drawer.toggleDrawerState();
  }

  async showMessages() {
    const options: ModalDialogOptions = {
      context: { messages$: this.messages$ },
      fullscreen: true,
      viewContainerRef: this.viewContainerRef
    };

    await this.modalService.showModal(MessagesComponent, options);
  }

  private updateRouteTitle() {
    let route = this.route.firstChild;
    let child = route;

    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
        route = child;
      } else {
        child = null;
      }
    }

    const { title } = route.snapshot.data;

    this.selectedPageTitle = title || '';
  }
}
