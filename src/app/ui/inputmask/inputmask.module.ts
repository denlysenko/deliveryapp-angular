import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputMaskDirective } from './inputmask.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [InputMaskDirective],
  exports: [InputMaskDirective]
})
export class InputMaskModule {}
