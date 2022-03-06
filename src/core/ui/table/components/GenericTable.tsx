import * as React from 'react';
import {
  Box,
  Checkbox,
  TableHead,
  TableSortLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import { TableHeader, TableSorting } from '../tableTypes';
import { Delete } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { Spinner } from '../../utility/Loading';

type GenericTableArgs = {
  data: Record<string, any>[];
  tableHeaders: TableHeader[];
  size?: 'medium' | 'small';
  sorting?: TableSorting;
  loading?: boolean;
  checklist: Record<string, any>;
  toggleChecklist: (field?: string) => void;
  renderSummary: () => React.ReactElement;
  renderFilterBlock: () => React.ReactElement;
  renderFooter: () => React.ReactElement;
  renderActions: (g: any) => React.ReactElement;

  onMultiDelete?: () => Promise<void>;
};

const GenericTable = ({
  data,
  tableHeaders,
  size = 'medium',
  sorting,
  loading = false,
  checklist,
  toggleChecklist,
  renderSummary,
  renderFilterBlock,
  renderActions,
  renderFooter,

  onMultiDelete,
}: GenericTableArgs) => {
  const selectCount = Object.values(checklist).length;

  return (
    <Box>
      {renderSummary()}
      {renderFilterBlock()}
      <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
        {selectCount ? (
          <>
            <Typography variant="body1" sx={{ mr: 1, ml: 2 }} fontSize="13px">
              {selectCount} Entr{selectCount === 1 ? 'y' : 'ies'} selected
              &nbsp;&nbsp;&nbsp;-
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              onClick={() => onMultiDelete?.call(this)}
            >
              <Typography
                variant="body1"
                fontSize="13px"
                color="red"
                sx={{ cursor: 'pointer' }}
              >
                Delete entr{selectCount === 1 ? 'y' : 'ies'}
              </Typography>
              <Delete
                sx={{ color: red[600], cursor: 'pointer', fontSize: '15px' }}
              />
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, overflowX: 'auto' }}
          aria-label="custom pagination table"
          size={size}
        >
          <TableHead sx={{ background: 'rgb(243,243,242)' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  size="small"
                  checked={Object.values(checklist).length === data.length}
                  onChange={() => toggleChecklist()}
                  inputProps={{
                    'aria-labelledby': '',
                  }}
                />
              </TableCell>
              {tableHeaders.map((head) => (
                <TableCell key={head.field} align={head.align || 'left'}>
                  <TableSortLabel
                    active={sorting?.orderBy === head.field}
                    direction={
                      sorting?.orderBy === head.field ? sorting!.orderOp : 'asc'
                    }
                    onClick={(_) => sorting?.onSort(head.field)}
                  >
                    {head.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ width: '96px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={tableHeaders.length}>
                  <Grid container justifyContent="center" sx={{ py: 1 }}>
                    <Spinner />
                  </Grid>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, i) => (
                <TableRow key={`row-${i}${row.id}`}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      size="small"
                      checked={checklist[row.id] === true}
                      inputProps={{
                        'aria-labelledby': '',
                      }}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleChecklist(row.id);
                        console.log('toggle', row);
                      }}
                    />
                  </TableCell>
                  {tableHeaders.map((tableHead, j) => (
                    <TableCell
                      key={`row${i}${j}`}
                      align={tableHead.align || 'left'}
                    >
                      {row[tableHead.field]}
                    </TableCell>
                  ))}
                  <TableCell align="right" sx={{ width: '96px' }}>
                    {renderActions(row)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {!loading && renderFooter()}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GenericTable;
