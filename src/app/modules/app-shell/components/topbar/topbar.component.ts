import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output
} from '@angular/core';

import { User } from '@users/models';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'da-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  items: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'fa fa-user',
      routerLink: ['/profile']
    },
    {
      label: 'Messages',
      icon: 'fa fa-envelope-o',
      command: () => {
        this.openSidebar.emit();
      }
    },
    {
      label: 'Logout',
      icon: 'fa fa-sign-out',
      command: () => {
        this.logout.emit();
      }
    }
  ];

  @Input() user: User;
  @Input() unreadMessages: number;

  @Output() logout = new EventEmitter<void>();
  @Output() openSidebar = new EventEmitter<void>();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const layout = this.document.querySelector('.layout');
    layout.classList.toggle('layout-menu-active');
  }
}
