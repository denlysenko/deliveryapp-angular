import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  ButtonModule,
  InputTextModule,
  MenuModule,
  SidebarModule,
  TooltipModule
} from 'primeng/primeng';

import { componentDeclarations, importDeclarations } from './app-shell.common';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  imports: [
    CommonModule,
    ...importDeclarations,
    SidebarModule,
    InputTextModule,
    MenuModule,
    ButtonModule,
    TooltipModule
  ],
  declarations: [...componentDeclarations, TopbarComponent]
})
export class AppShellModule {}
