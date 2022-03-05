import React from 'react';
import Box from '@mui/material/Box';
import PaginationGroup from '../../button/PaginationGroup';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const PaginationActions: React.FC<TablePaginationActionsProps> = (
  props: TablePaginationActionsProps
) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const buttonsLimit = 5;
  // console.log({ buttonsLimit, count, page });

  return (
    <Box sx={{ flexShrink: 0, mr: 2 }}>
      {count ? (
        <PaginationGroup
          currentPage={page + 1}
          pageCount={Math.ceil(count / rowsPerPage)}
          buttonsLimit={buttonsLimit}
          onPageChange={(event, page) => onPageChange(event, page - 1)}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default PaginationActions;
