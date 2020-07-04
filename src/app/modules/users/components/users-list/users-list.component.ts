import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { BaseListComponent } from '@base/BaseListComponent';

import { roleNames } from '@common/enums';

import { User } from '../../models';

@Component({
  selector: 'da-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent extends BaseListComponent {
  readonly roleName = roleNames;

  @Input() users: User[];
  @Input() selectedUser: User;

  @Output() userSelected = new EventEmitter<User>();
}
