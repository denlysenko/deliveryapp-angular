import { Component } from '@angular/core';

import { Roles } from '@common/enums';

import { DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'da-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {
  readonly roles = Roles;

  user = this.config.data;

  constructor(private config: DynamicDialogConfig) {}
}
