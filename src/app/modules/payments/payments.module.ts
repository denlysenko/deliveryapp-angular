import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { importDeclarations, providerDeclarations } from './payments.common';

@NgModule({
  declarations: [],
  imports: [CommonModule, ...importDeclarations],
  providers: [...providerDeclarations]
})
export class PaymentsModule {}
