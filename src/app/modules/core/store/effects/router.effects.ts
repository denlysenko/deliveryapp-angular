import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';

import { RouterExtensions } from '../../services/router-extensions/router-extensions.service';
import { Go, RouterActionTypes } from '../actions/router.actions';

@Injectable()
export class RouterEffects {
  constructor(private router: RouterExtensions, private actions$: Actions) {}

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
    .pipe(tap(() => this.router.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(RouterActionTypes.FORWARD)
    .pipe(tap(() => this.router.forward()));
}
