import { BaseFilter } from '@common/models';

type OrderField = 'createdAt';

export interface LogsFilter extends BaseFilter {
  filter: {
    action?: number;
  };
  order: Partial<
    {
      [key in OrderField]: 'desc' | 'asc';
    }
  >;
}
