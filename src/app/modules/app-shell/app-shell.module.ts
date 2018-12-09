import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SidebarModule } from 'primeng/primeng';

import { componentDeclarations, importDeclarations } from './app-shell.common';

@NgModule({
  imports: [CommonModule, ...importDeclarations, SidebarModule],
  declarations: [...componentDeclarations]
})
export class AppShellModule {}
