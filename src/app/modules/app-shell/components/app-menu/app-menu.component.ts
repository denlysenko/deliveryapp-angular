import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { appMenu } from '@common/app-menu';

@Component({
  selector: 'da-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppMenuComponent {
  menu = appMenu;

  @Input() role: number;

  canSee(roles: number[]): boolean {
    return roles.includes(this.role);
  }
}
