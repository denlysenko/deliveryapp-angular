import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule, InputTextModule, MenuModule, SidebarModule } from 'primeng/primeng';

import { componentDeclarations, importDeclarations } from './app-shell.common';
import { TopbarComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    ...importDeclarations,
    SidebarModule,
    InputTextModule,
    MenuModule,
    ButtonModule
  ],
  declarations: [...componentDeclarations, TopbarComponent]
})
export class AppShellModule {}
