import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

import { providerDeclarations } from './user-view.common';
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
  entryComponents: [UserViewComponent],
  providers: [...providerDeclarations, DialogService, UserViewService]
})
export class UserViewModule {}
