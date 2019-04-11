export interface PaymentsFilter {
  'filter[id]'?: number;
  'order[createdAt]'?: 'asc' | 'desc';
  'order[total]'?: 'asc' | 'desc';
  'order[status]'?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
