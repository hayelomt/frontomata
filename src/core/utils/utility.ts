export const parseQuery = ({
  page,
  rowsPerPage,
  sortField,
  sortOp,
  filter,
}: Record<string, any>) => {
  let parsed = '?';

  if (rowsPerPage) {
    parsed += `limit=${rowsPerPage}&page=${page}&`;
  }
  if (sortField) {
    parsed += `sort_field=${sortField}&sort_op=${sortOp || 'asc'}&`;
  }
  if (filter) {
    parsed += `filter=${JSON.stringify(filter)}`;
  }

  if (parsed.endsWith('&')) {
    parsed = parsed.substring(0, parsed.length - 1);
  }

  return parsed;
};
