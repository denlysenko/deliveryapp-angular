import { Injectable } from '@angular/core';

import { Storage } from './Storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements Storage {
  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
