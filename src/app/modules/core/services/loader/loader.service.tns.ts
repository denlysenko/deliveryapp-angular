import { Injectable } from '@angular/core';

import { LoadingIndicator } from 'nativescript-loading-indicator';

import { Loader } from './Loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService implements Loader {
  private loader: LoadingIndicator;

  constructor() {
    this.loader = new LoadingIndicator();
  }

  start() {
    const options = {
      ios: {
        dimBackground: true,
        color: '#3984b8',
        backgroundColor: '#ffffff'
      }
    };

    this.loader.show(options);
  }

  stop() {
    this.loader.hide();
  }
}
