import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { General } from '../general';
import PaginationActions from '../../../core/ui/table/pagination/PaginationActions';
import { Grid, TableHead } from '@mui/material';
import { DateTime } from 'luxon';
import { PaginationTableProps } from '../../../core/utils/types';
import { Link } from 'react-router-dom';
import { Edit } from '@mui/icons-material';

type GeneralsTableArgs = {
  data: General[];
  pagination: PaginationTableProps;
  TablePaginationActions?: React.FC<any>;
  renderDelete: (g: General) => React.ReactElement;
};

const GeneralsTable = ({
  data,
  pagination: {
    page,
    rowsPerPage,
    total,
    handleChangePage,
    handleChangeRowsPerPage,
  },
  renderDelete,
  TablePaginationActions = PaginationActions,
}: GeneralsTableArgs) => {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell variant="head">#</TableCell>
            <TableCell variant="head">Title</TableCell>
            <TableCell variant="head">Created</TableCell>
            <TableCell variant="head" sx={{ width: '90px' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((general, i) => (
            <TableRow key={general.id}>
              <TableCell component="th" scope="row">
                {page * rowsPerPage + i + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {general.title}
              </TableCell>
              <TableCell component="th" scope="row">
                {DateTime.fromISO(general.created_at).toLocaleString(
                  DateTime.DATE_MED
                )}
              </TableCell>
              <TableCell align="right" sx={{ width: '90px' }}>
                <Grid container justifyContent="flex-end">
                  <Link to={`/generals/edit/${general.id}`}>
                    <Edit fontSize="small" color="secondary" sx={{ mr: 1 }} />
                  </Link>
                  {renderDelete(general)}
                </Grid>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={1} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100, 500]}
              colSpan={3}
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
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default GeneralsTable;
