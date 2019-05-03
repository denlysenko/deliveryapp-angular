export interface LogsFilter {
  'order[createdAt]'?: 'desc' | 'asc';
  'filter[userId]'?: number;
  'filter[action]'?: number;
  offset: number;
  limit: number;
}
