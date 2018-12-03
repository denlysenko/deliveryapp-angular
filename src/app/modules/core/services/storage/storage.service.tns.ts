import { Injectable } from '@angular/core';

import { getString, remove, setString } from 'tns-core-modules/application-settings';

import { Storage } from './Storage';

@Injectable()
export class StorageService implements Storage {
  getItem(key: string): any {
    return getString(key);
  }

  setItem(key: string, value: any) {
    setString(key, value);
  }

  removeItem(key: string) {
    remove(key);
  }
}
