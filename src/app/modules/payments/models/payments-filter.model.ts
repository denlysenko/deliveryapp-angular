import { BaseFilter } from '@common/models';

type OrderField = 'id' | 'createdAt' | 'total' | 'status';

export interface PaymentsFilter extends BaseFilter {
  filter: {
    id?: number;
  };
  order: Partial<
    {
      [key in OrderField]: 'desc' | 'asc';
    }
  >;
}
