import { Box, Grid, Typography } from '@mui/material';
import { TableHeader } from '../tableTypes';
import TableSettings from './TableSettings';

type FilterBlockProps = {
  tableHeaders: TableHeader[];
  fieldVisible: Record<string, boolean>;
  toggleFieldVisibility: (f: string) => void;
  tableDense: boolean;
  toggleTableDensity: (field: boolean) => void;
};

const FilterBlock = ({
  tableHeaders,
  fieldVisible,
  toggleFieldVisibility,
  tableDense,
  toggleTableDensity,
}: FilterBlockProps) => {
  return (
    <>
      <Box
        sx={{ mb: '4px', mt: 1 }}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid item>
          <Typography>Filters</Typography>
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
    </>
  );
};

export default FilterBlock;
