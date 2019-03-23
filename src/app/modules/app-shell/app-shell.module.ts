import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  ButtonModule,
  InputTextModule,
  MenuModule,
  SidebarModule,
  TooltipModule
} from 'primeng/primeng';

import { componentDeclarations } from './app-shell.common';
import { MessagesComponent } from './components/messages/messages.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AppShellComponent } from './containers/app-shell/app-shell.component';

const components = [MessagesComponent, TopbarComponent];
const containers = [AppShellComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    InputTextModule,
    MenuModule,
    ButtonModule,
    TooltipModule
  ],
  declarations: [...componentDeclarations, ...containers, ...components]
})
export class AppShellModule {}
