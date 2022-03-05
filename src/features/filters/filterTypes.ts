export type FieldType = 'string' | 'date' | 'number' | 'boolean';

export type FilterOp =
  | 'is'
  | 'is not'
  | 'is greater than'
  | 'is greater than or equal to'
  | 'is less than'
  | 'is less than or equal to'
  | 'is less than'
  | 'contains'
  | 'contains'
  | 'contains(case sensitive)'
  | 'true'
  | 'false';

export const fieldFilterMap: Record<FieldType, FilterOp[]> = {
  string: ['is', 'is not', 'contains', 'contains(case sensitive)'],
  number: [
    'is',
    'is greater than',
    'is greater than or equal to',
    'is less than',
    'is less than or equal to',
  ],
  boolean: ['true', 'false'],
  date: [
    'is',
    'is greater than',
    'is greater than or equal to',
    'is less than',
    'is less than or equal to',
  ],
};

export type FilterSelection = {
  field: string;
  op: FilterOp;
  value: any;
};
