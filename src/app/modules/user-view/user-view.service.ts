import { Injectable } from '@angular/core';

import { UsersService } from '@users/services/users.service';

import { DialogService } from 'primeng/api';

import { UserViewComponent } from './user-view.component';

@Injectable()
export class UserViewService {
  constructor(
    private dialogService: DialogService,
    private usersService: UsersService
  ) {}

  async show(id: number) {
    const user = await this.usersService.getById(id).toPromise();

    return this.dialogService.open(UserViewComponent, {
      data: user,
      height: '480px'
    });
  }
}
