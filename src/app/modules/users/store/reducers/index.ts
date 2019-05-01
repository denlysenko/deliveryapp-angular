import { createFeatureSelector } from '@ngrx/store';

import { UsersState } from './users.reducer';

export { usersReducer, UsersState } from './users.reducer';
export const getUsersState = createFeatureSelector<UsersState>('users');
