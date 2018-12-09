import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '@auth/models';
import { MenuItem } from 'primeng/primeng';

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
      routerLink: ['profile']
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

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const layout = document.querySelector('.layout');
    layout.classList.toggle('layout-menu-active');
  }
}
