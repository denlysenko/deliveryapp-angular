import { SortingChangeEvent } from '../models';

interface SortData {
  sortField: string;
  sortOrder: number;
}

export function extractSortFieldAndOrder(
  sorting: SortingChangeEvent
): SortData {
  const keys = Object.keys(sorting);
  const values = Object.values(sorting);

  if (!keys.length) {
    throw new Error(
      '[extractSortFieldAndOrder] Provided array cannot be empty!'
    );
  }

  return {
    sortField: keys[0],
    sortOrder: values[0] === undefined ? -1 : values[0] === 'asc' ? 1 : -1
  };
}
