import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MessagesModule } from '@messages/messages.module';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';

import { componentDeclarations } from './app-shell.common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AppShellComponent } from './containers/app-shell/app-shell.component';

const components = [TopbarComponent];
const containers = [AppShellComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    InputTextModule,
    MenuModule,
    ButtonModule,
    TooltipModule,
    MessagesModule
  ],
  declarations: [...componentDeclarations, ...containers, ...components]
})
export class AppShellModule {}
