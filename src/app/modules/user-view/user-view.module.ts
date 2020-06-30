import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UsersService } from '@users/services/users.service';

import { DialogService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

import { UserViewComponent } from './user-view.component';
import { UserViewService } from './user-view.service';

@NgModule({
  declarations: [UserViewComponent],
  imports: [
    CommonModule,
    InputTextModule,
    TabViewModule,
    ButtonModule,
    DynamicDialogModule
  ],
  exports: [UserViewComponent],
  providers: [UsersService, DialogService, UserViewService]
})
export class UserViewModule {}
