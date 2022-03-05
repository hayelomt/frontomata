import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import PaginationButton from './PaginationButton';

type PaginationGroupProps = {
  currentPage: number;
  pageCount: number;
  buttonsLimit?: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, x: number) => void;
};

const PaginationGroup: React.FC<PaginationGroupProps> = ({
  currentPage,
  pageCount,
  buttonsLimit = 10,
  onPageChange,
}) => {
  const generateRowNumbers = (
    curPage: number,
    butLimit: number,
    pageLimit: number
  ) => {
    let rowNumbers: number[] = [];
    let leftDecrement = 1;
    let rightIncrement = 1;

    const checkLimit = (i: number): boolean =>
      butLimit < pageLimit ? i < butLimit : i < pageLimit;

    for (let i = 0; checkLimit(i); i++) {
      const curNumber = curPage;
      if (i === 0) {
        rowNumbers.push(curNumber);
      } else if (i % 2 === 0) {
        if (curPage + rightIncrement <= pageLimit) {
          rowNumbers.push(curNumber + rightIncrement++);
        } else {
          rowNumbers = [curNumber - leftDecrement++, ...rowNumbers];
        }
      } else {
        if (curPage - leftDecrement > 0) {
          rowNumbers = [curNumber - leftDecrement++, ...rowNumbers];
        } else {
          rowNumbers.push(curNumber + rightIncrement++);
        }
      }
    }

    return rowNumbers;
  };

  const renderLinks = () => {
    const rowNumbers: number[] = generateRowNumbers(
      currentPage,
      buttonsLimit,
      pageCount
    );

    if (rowNumbers.length >= buttonsLimit) {
      if (rowNumbers[0] !== 1) {
        rowNumbers.splice(0, 1, 1);
      }
      if (
        rowNumbers.length > 1 &&
        rowNumbers[rowNumbers.length - 1] !== pageCount
      ) {
        rowNumbers.splice(rowNumbers.length - 1, 1, pageCount);
      }
    }

    const rows = rowNumbers.map((row) => (
      <PaginationButton
        key={`key-${row}`}
        onClick={(e) => onPageChange(e, row)}
        page={row}
        active={currentPage === row}
      />
    ));

    if (pageCount > buttonsLimit && rowNumbers.length > 2) {
      if (rowNumbers[1] !== 2) {
        rows.splice(1, 0, <Typography key="key-start">..</Typography>);
      }
      if (rowNumbers[rowNumbers.length - 2] !== pageCount - 1) {
        rows.splice(
          rows.length - 1,
          0,
          <Typography key="key-finish">..</Typography>
        );
      }
    }

    return <>{rows}</>;
  };

  const renderMenuItems = () => {
    const items: React.ReactElement[] = [];
    for (let i = 1; i <= pageCount; i++) {
      items.push(
        <MenuItem key={`menu${i}`} value={i}>
          {i}
        </MenuItem>
      );
    }

    return items;
  };

  return (
    <>
      <Box sx={{ display: 'flex' }} alignItems="flex-end">
        {renderLinks()}
        <Box sx={{ minWidth: 20, ml: 2 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Page</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentPage}
              label="Page"
              onChange={(e) => onPageChange(e as any, +e.target.value)}
              size="small"
              sx={{ height: '30px' }}
            >
              {renderMenuItems()}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default PaginationGroup;
