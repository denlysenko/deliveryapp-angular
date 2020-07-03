import { Directive, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseComponent implements OnDestroy {
  protected destroy$: Subject<any> = new Subject();

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
