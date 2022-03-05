import { useState } from 'react';
import tableServices from '../tableServices';
import { SortOp } from '../tableTypes';

const useSorting = (modelToken: string) => {
  const savedSort = tableServices.getSorting(modelToken);
  const [sortField, setSortField] = useState(savedSort.sortField);
  const [sortOp, setSortOp] = useState<SortOp>(savedSort.sortOp);

  const handleSort = (field: string) => {
    let orderOp: SortOp = 'asc';

    if (sortField === field) {
      orderOp = sortOp === 'asc' ? 'desc' : 'asc';
    }

    setSortField(field);
    setSortOp(orderOp);
    tableServices.saveSorting(modelToken, field, orderOp);
  };

  return { sortField, sortOp, handleSort };
};

export default useSorting;
