import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Loader } from './Loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements Loader {
  status = new Subject<boolean>();
  isLoading$ = this.status.asObservable();

  start() {
    this.status.next(true);
  }

  stop() {
    this.status.next(false);
  }
}
