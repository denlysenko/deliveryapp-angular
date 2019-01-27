import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';

import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { SelfActionTypes } from '../actions';
import { messagesReducer, MessageState } from './messages.reducer';
import { selfReducer, SelfState } from './self.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface CoreState {
  routerReducer: RouterReducerState<RouterStateUrl>;
  self: SelfState;
  messages: MessageState;
}

export const reducers: ActionReducerMap<CoreState> = {
  routerReducer: routerReducer,
  self: selfReducer,
  messages: messagesReducer
};

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('routerReducer');

export const getSelfState = createFeatureSelector<SelfState>('self');

export const getMessagesState = createFeatureSelector<MessageState>('messages');

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

export function clearState(reducer) {
  return function(state, action) {
    if (action.type === SelfActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
