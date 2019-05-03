import { createFeatureSelector } from '@ngrx/store';

import { LogsState } from './logs.reducer';

export { logsReducer, LogsState } from './logs.reducer';
export const getLogsState = createFeatureSelector<LogsState>('logs');
