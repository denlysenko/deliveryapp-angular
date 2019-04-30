export interface UsersFilter {
  'filter[id]'?: number;
  'filter[role]'?: number | number[];
  'filter[email]'?: string;
  'filter[firstName]'?: string;
  'filter[lastName]'?: string;
  'order[id]'?: 'asc' | 'desc';
  'order[firstName]'?: 'asc' | 'desc';
  'order[lastName]'?: 'asc' | 'desc';
  limit: number;
  offset: number;
}
