import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { ExtendedNavigationExtras } from '../../models/router-payload.model';

@Injectable()
export class RouterExtensions {
  constructor(
    private router: Router,
    private locationStrategy: LocationStrategy
  ) {}

  navigate(
    commands: Array<any>,
    extras?: ExtendedNavigationExtras
  ): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }

  navigateByUrl(
    url: string | UrlTree,
    options?: ExtendedNavigationExtras
  ): Promise<boolean> {
    return this.router.navigateByUrl(url, options);
  }

  back() {
    this.locationStrategy.back();
  }

  forward() {
    this.locationStrategy.forward();
  }
}
