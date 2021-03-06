// https://github.com/RobinHerbots/Inputmask
import 'inputmask.phone';
import 'inputmask.phone/dist/inputmask.phone/phone-codes/phone';

import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import Inputmask from 'inputmask';

@Directive({
  selector: '[daInputMask]'
})
export class InputMaskDirective implements OnInit {
  @Input() mask: string;

  constructor(private elem: ElementRef) {}

  ngOnInit() {
    const inputMask = new Inputmask(this.mask);
    // tslint:disable-next-line:no-commented-code
    /*
    inputMask.opts.onKeyValidation = () => {
      console.log(this.elem.nativeElement.inputmask.getmetadata());
    };
    */
    inputMask.mask(this.elem.nativeElement);
  }
}
