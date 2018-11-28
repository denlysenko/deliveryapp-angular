import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';

import { Go, RouterActionTypes } from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(RouterActionTypes.GO).pipe(
    map((action: Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(RouterActionTypes.BACK)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(RouterActionTypes.FORWARD)
    .pipe(tap(() => this.location.forward()));
}
