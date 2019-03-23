import { SortingChangeEvent } from '../models';

interface SortData {
  sortField: string;
  sortOrder: number;
}

export function extractSortFieldAndOrder(
  sorting: SortingChangeEvent
): SortData {
  const keys = Object.keys(sorting); // we know that store can contain only one key

  if (!keys.length) {
    throw new Error(
      '[extractSortFieldAndOrder] Provided array cannot be empty!'
    );
  }

  const sortOrder = sorting[keys[0]] === 'asc' ? 1 : -1;
  const index = keys[0].indexOf('[');
  const lastIndex = keys[0].indexOf(']');
  const sortField = keys[0].slice(index + 1, lastIndex);

  return {
    sortField,
    sortOrder
  };
}
