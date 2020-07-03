import { Injectable } from '@angular/core';

import { UsersService } from '@users/services/users.service';

import { DialogService } from 'primeng/dynamicdialog';

import { UserViewComponent } from './user-view.component';

@Injectable()
export class UserViewService {
  constructor(
    private readonly dialogService: DialogService,
    private readonly usersService: UsersService
  ) {}

  async show(id: number) {
    const user = await this.usersService.getById(id).toPromise();

    return this.dialogService.open(UserViewComponent, {
      data: user,
      styleClass: 'user-view'
    });
  }
}
