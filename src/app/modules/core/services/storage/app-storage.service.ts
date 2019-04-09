import { Injectable } from '@angular/core';

import { Storage } from './Storage';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService implements Storage {
  private storage = new Map<string, any>();

  getItem(key: string): any {
    return this.storage.get(key);
  }

  setItem(key: string, value: any) {
    this.storage.set(key, value);
  }

  removeItem(key: string) {
    this.storage.delete(key);
  }
}
