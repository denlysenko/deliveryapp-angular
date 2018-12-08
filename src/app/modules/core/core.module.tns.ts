import { NgModule } from '@angular/core';

import { importDeclarations, providerDeclarations } from './core.common';

@NgModule({
  imports: [...importDeclarations],
  providers: [...providerDeclarations]
})
export class CoreModule {}
