import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { componentDeclarations } from './app-shell.common';

@NgModule({
  declarations: [...componentDeclarations],
  imports: [CommonModule]
})
export class AppShellModule {}
