import {
  FormControl,
  MenuItem,
  Select,
  Grid,
  Box,
  TextField,
} from '@mui/material';
import DateSelector from '../../../utility/DateSelector';
import { fieldFilterMap, FieldType, FilterOp } from './filterTypes';

type FilterFormProps = {
  fields: string[];
  fieldType: FieldType;
  selectedField: string;
  onFieldChange: (f: string) => void;
  selectedOp: FilterOp;
  onOpChange: (f: FilterOp) => void;
  fieldValue: any;
  onValueChange: (d: any) => void;
};

const FilterForm = ({
  fields,
  fieldType,
  selectedField,
  onFieldChange,
  selectedOp,
  onOpChange,
  fieldValue,
  onValueChange,
}: FilterFormProps) => {
  return (
    <>
      <Box sx={{}} display="flex">
        <Grid item>
          <FormControl sx={{ width: '200px' }}>
            <Select
              labelId="field-select-label"
              id="field-select"
              value={selectedField}
              sx={{ height: '30px' }}
              onChange={(e) => onFieldChange(e.target.value)}
            >
              {fields.map((item) => (
                <MenuItem
                  key={`field-select-${item}`}
                  value={item}
                  sx={{ height: '20px' }}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ mx: 1 }}>
          <FormControl sx={{ width: '200px' }}>
            <Select
              labelId="field-select-label"
              id="field-select"
              value={selectedOp}
              sx={{ height: '30px' }}
              onChange={(e) => onOpChange(e.target.value as FilterOp)}
            >
              {fieldFilterMap[fieldType].map((item) => (
                <MenuItem
                  key={`type-select-${item}`}
                  value={item}
                  sx={{ height: '20px' }}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ mx: 1 }}>
          {fieldType === 'string' && (
            <FormControl sx={{ width: '200px', height: '30px' }}>
              <TextField
                sx={{
                  p: 0,
                  'div > input': {
                    height: '12px !important',
                  },
                }}
                value={fieldValue || ''}
                onChange={(e) => onValueChange(e.target.value)}
                size="small"
                variant="outlined"
              />
            </FormControl>
          )}
          {fieldType === 'number' && (
            <FormControl sx={{ width: '200px', height: '30px' }}>
              <TextField
                sx={{
                  p: 0,
                  'div > input': {
                    height: '12px !important',
                  },
                }}
                type="number"
                value={fieldValue || ''}
                onChange={(e) => onValueChange(e.target.value)}
                size="small"
                variant="outlined"
              />
            </FormControl>
          )}
          {fieldType === 'date' && (
            <FormControl sx={{ width: '200px', height: '30px' }}>
              <DateSelector date={fieldValue} onDateChange={onValueChange} />
            </FormControl>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default FilterForm;
