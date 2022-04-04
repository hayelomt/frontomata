export type SortOp = 'asc' | 'desc';

export type TableHeader = {
  field: string;
  label: string;
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
  renderItem?: (item: any) => any;
};

export type TableSorting = {
  orderBy: string;
  orderOp: SortOp;
  onSort: (field: string) => void | Promise<void>;
};

export type TableActions = {
  onFetchData: (query: any, cb: (c: number) => void) => Promise<void>;
  onDelete: (id: number | string, showMessage?: boolean) => Promise<boolean>;
};

export type RouteSettings = {
  edit?: string;
  create?: string;
  delete?: string;
  view?: string;
};

export type TableSettings = {
  canEdit?: boolean;
  canDelete?: boolean;
  canCreate?: boolean;
  canViewItem?: boolean;
};
