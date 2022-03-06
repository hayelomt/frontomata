import { useState } from 'react';
import tableServices from '../tableServices';

const useTablePagination = (modelToken: string) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    tableServices.getRowsPerPage(modelToken)
  );
  const [total, setTotal] = useState(90);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    tableServices.saveRowsPerPage(modelToken, parseInt(event.target.value, 10));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    data: { page, rowsPerPage, total },
    handlers: { handleChangePage, handleChangeRowsPerPage, setTotal },
  };
};

export default useTablePagination;
