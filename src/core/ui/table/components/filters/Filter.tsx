import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import FilterFormContainer from './FilterFormContainer';
import { fieldFilterMap, FieldType, FilterSelection } from './filterTypes';

type FilterProps = {
  label: string;
  onClear: () => void;
  onApply: (filter: any) => void;
};

const Filter = ({ label, onClear, onApply }: FilterProps) => {
  const fieldMap: Record<string, FieldType> = {
    age: 'number',
    name: 'string',
    created_at: 'date',
    title: 'string',
    active: 'boolean',
  };
  const fields = Object.keys(fieldMap);
  const [filterFields, setFilterFields] = useState<FilterSelection[]>([
    {
      field: fields[0],
      op: fieldFilterMap[fieldMap[fields[0]]][0],
      value: null,
    },
  ]);

  return (
    <>
      <Box
        sx={{
          py: 1,
          px: 1,
          pb: 3,
          mt: 1,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: '5px',
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">{label} - Filters</Typography>
          </Grid>
          <Grid item display="flex">
            <Button
              variant="outlined"
              sx={{
                mr: 1,
                height: '25px',
                fontSize: '13px',
                textTransform: 'none',
                borderRadius: '3px',
              }}
              color="primary"
              onClick={onClear}
            >
              Clear all
            </Button>
            <Button
              variant="contained"
              sx={{
                mr: 1,
                height: '25px',
                fontSize: '13px',
                textTransform: 'none',
                borderRadius: '3px',
                px: 5,
              }}
              color="primary"
              onClick={() => onApply(filterFields)}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1 }}>
          <FilterFormContainer
            filterFields={filterFields}
            setFilterFields={setFilterFields}
            fields={fields}
            fieldMap={fieldMap}
            onClear={onClear}
          />
        </Box>
      </Box>
    </>
  );
};

export default Filter;
