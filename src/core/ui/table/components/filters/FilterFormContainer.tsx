import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Grid } from '@mui/material';
import FilterForm from './FilterForm';
import {
  fieldFilterMap,
  FieldType,
  FilterOp,
  FilterSelection,
} from './filterTypes';

type FilterFormContainerProps = {
  filterFields: FilterSelection[];
  setFilterFields: (f: FilterSelection[]) => void;
  fieldMap: Record<string, FieldType>;
  fields: string[];
  onClear: () => void;
};

const FilterFormContainer = ({
  filterFields,
  setFilterFields,
  fieldMap,
  fields,
  onClear,
}: FilterFormContainerProps) => {
  const handleFieldChange = (index: number, val: string) => {
    const curFields = [...filterFields];
    curFields[index].field = val;
    curFields[index].op = fieldFilterMap[fieldMap[val]][0];
    setFilterFields(curFields);
  };

  const handleOpChange = (index: number, val: FilterOp) => {
    const curFields = [...filterFields];
    curFields[index].op = val;
    curFields[index].value =
      fieldMap[curFields[index].field] === 'boolean' ? val === 'true' : null;
    curFields[index].value = setFilterFields(curFields);
  };

  const handleValueChange = (index: number, val: any) => {
    const curFields = [...filterFields];
    curFields[index].value = val;
    setFilterFields(curFields);
  };

  const handleAddFilter = () => {
    setFilterFields([
      ...filterFields,
      {
        field: fields[0],
        op: fieldFilterMap[fieldMap[fields[0]]][0],
        value: null,
      },
    ]);
  };

  const handleRemoveFilter = (index: number) => {
    if (filterFields.length === 1) {
      onClear();
    } else {
      const curFields = [...filterFields];
      curFields.splice(index, 1);
      setFilterFields(curFields);
    }
  };

  return (
    <>
      <Grid container display="flex" flexDirection="column">
        {filterFields.map(({ field, op, value }, i) => (
          <Grid
            item
            key={`selector-${i}`}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              borderLeft: '3px solid',
              borderLeftColor: 'primary.main',
              mb: '4px',
            }}
          >
            <RemoveCircleOutline
              fontSize="small"
              sx={{ mx: 1, alignSelf: 'center' }}
              color="warning"
              onClick={() => handleRemoveFilter(i)}
            />
            <FilterForm
              fields={fields}
              selectedField={field}
              fieldType={fieldMap[field]}
              onFieldChange={(val) => handleFieldChange(i, val)}
              selectedOp={op}
              onOpChange={(val) => handleOpChange(i, val)}
              fieldValue={value}
              onValueChange={(val) => handleValueChange(i, val)}
            />
            {i === filterFields.length - 1 ? (
              <AddCircleOutline
                fontSize="small"
                sx={{ ml: 1, alignSelf: 'center' }}
                color="primary"
                onClick={handleAddFilter}
              />
            ) : (
              <></>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FilterFormContainer;
