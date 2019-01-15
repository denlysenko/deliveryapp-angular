import { ValidationError } from '@common/models';

import { OrdersAction, OrdersActionTypes } from '../actions';

export interface OrdersState {
  loading: boolean;
  error: ValidationError | null;
}

export const initialState: OrdersState = {
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: OrdersAction
): OrdersState {
  switch (action.type) {
    case OrdersActionTypes.CREATE_ORDER:
    case OrdersActionTypes.UPDATE_ORDER: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case OrdersActionTypes.CREATE_ORDER_SUCCESS:
    case OrdersActionTypes.UPDATE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }

    case OrdersActionTypes.CREATE_ORDER_FAIL:
    case OrdersActionTypes.UPDATE_ORDER_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
  }

  return state;
}

export const getOrdersLoading = (state: OrdersState) => state.loading;
export const getOrdersError = (state: OrdersState) => state.error;
