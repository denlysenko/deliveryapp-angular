import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { CoreFacade } from '@core/store';

import { MessagesComponent } from '@messages/components/messages/messages.component.tns';
import { MessagesFacade } from '@messages/store';

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

import { takeUntil } from 'rxjs/operators';

import { AppShellBase } from '../../base/AppShellBase';

@Component({
  selector: 'da-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent extends AppShellBase implements AfterViewInit {
  @ViewChild('drawer', { static: true })
  drawerComponent: RadSideDrawerComponent;

  private _sideDrawerTransition: DrawerTransitionBase;

  private get drawer(): SideDrawerType {
    return this.drawerComponent.sideDrawer;
  }

  constructor(
    coreFacade: CoreFacade,
    messagesFacade: MessagesFacade,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService
  ) {
    super(coreFacade, messagesFacade);

    this._sideDrawerTransition = new SlideAlongTransition();

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(e => {
      if (e instanceof NavigationEnd && this.drawer) {
        this.drawer.closeDrawer();
      }
    });
  }

  ngAfterViewInit() {
    if (this.drawer.ios) {
      const sideDrawer = this.drawer.ios.defaultSideDrawer;
      sideDrawer.style.shadowMode = 1;
      sideDrawer.style.shadowOpacity = 0.75;
      sideDrawer.style.shadowRadius = 5;
      sideDrawer.transitionDuration = 0.25;
    }
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  async showMessages() {
    const options: ModalDialogOptions = {
      fullscreen: true,
      viewContainerRef: this.viewContainerRef
    };

    await this.modalService.showModal(MessagesComponent, options);
  }
}
