import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMessages from './messages.reducer';
import * as fromSelf from './self.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface CoreState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  self: fromSelf.SelfState;
  messages: fromMessages.MessageState;
}

export const reducers: ActionReducerMap<CoreState> = {
  routerReducer: fromRouter.routerReducer,
  self: fromSelf.reducer,
  messages: fromMessages.reducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export const getSelfState = createFeatureSelector<fromSelf.SelfState>('self');

export const getMessagesState = createFeatureSelector<
  fromMessages.MessageState
>('messages');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
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
