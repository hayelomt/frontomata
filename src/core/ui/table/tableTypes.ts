export type SortOp = 'asc' | 'desc';

export type TableHeader = {
  field: string;
  label: string;
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
};

export type TableSorting = {
  orderBy: string;
  orderOp: SortOp;
  onSort: (field: string) => void | Promise<void>;
};
