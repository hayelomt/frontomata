import { FilterList } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import Filter from './Filter';
import { TableHeader } from '../../tableTypes';
import TableSettings from '../TableSettings';

type FilterBlockProps = {
  modelName: string;
  tableHeaders: TableHeader[];
  fieldVisible: Record<string, boolean>;
  toggleFieldVisibility: (f: string) => void;
  tableDense: boolean;
  toggleTableDensity: () => void;
  onFilterApply: (filter: any) => void;
};

const FilterBlock = ({
  modelName,
  tableHeaders,
  fieldVisible,
  toggleFieldVisibility,
  tableDense,
  toggleTableDensity,
  onFilterApply,
}: FilterBlockProps) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <Box
        sx={{ mb: '4px', mt: 2 }}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid
          item
          display="flex"
          alignItems="center"
          sx={{
            border: '1px solid',
            borderColor: 'grey.400',
            cursor: 'pointer',
            px: 1,
            borderRadius: '4px',
          }}
          onClick={() => {
            setShowFilter(!showFilter);
            onFilterApply({});
          }}
        >
          <FilterList sx={{ mr: 1, fontSize: '12px' }} />
          <Typography sx={{ fontSize: '14px' }}>Filters</Typography>
        </Grid>
        <Grid item>
          <TableSettings
            tableHeaders={tableHeaders}
            fieldVisible={fieldVisible}
            toggleFieldVisibility={toggleFieldVisibility}
            tableDense={tableDense}
            toggleTableDensity={toggleTableDensity}
          />
        </Grid>
      </Box>

      {showFilter && (
        <Filter
          label={modelName}
          onClear={() => {
            setShowFilter(false);
            onFilterApply({});
          }}
          onApply={onFilterApply}
        />
      )}
    </>
  );
};

export default FilterBlock;
