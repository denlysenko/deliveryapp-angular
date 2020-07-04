import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot
} from '@angular/router';

import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector
} from '@ngrx/store';

import { SelfActions, SelfActionTypes } from '../actions';
import { selfReducer, SelfState } from './self.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface CoreState {
  routerReducer: RouterReducerState<RouterStateUrl>;
  self: SelfState;
}

export const reducers: ActionReducerMap<CoreState> = {
  routerReducer: routerReducer,
  self: selfReducer
};

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('routerReducer');

export const getSelfState = createFeatureSelector<SelfState>('self');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    return {
      url,
      queryParams,
      params
    };
  }
}

export function clearState(reducer: ActionReducer<CoreState, SelfActions>) {
  return function (state: CoreState, action: SelfActions) {
    if (action.type === SelfActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
