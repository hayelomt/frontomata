import React from 'react';
import { TableFooter, TablePagination, TableRow } from '@mui/material';
import { PaginationTableProps } from '../../../utils/types';
import PaginationActions from '../pagination/PaginationActions';

type GenericTableFooterProps = {
  pagination: PaginationTableProps;
};

const GenericTableFooter: React.FC<GenericTableFooterProps> = ({
  pagination: {
    page,
    rowsPerPage,
    total,
    handleChangePage,
    handleChangeRowsPerPage,
  },
}) => {
  return (
    <>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100]}
            labelRowsPerPage="Per Page"
            labelDisplayedRows={() => <></>}
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={PaginationActions as React.FC<any>}
          />
        </TableRow>
      </TableFooter>
    </>
  );
};

export default GenericTableFooter;
