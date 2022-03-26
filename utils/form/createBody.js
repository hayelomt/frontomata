const { mergeImports, writeImports, tab } = require('../common-utils');
const { generatorMap, importMap } = require('./map');
const camelCase = require('camelcase');
const { getType } = require('../model/model');
const { getEditInitializer } = require('./editBody');

const getCreateInputMap = (collectionType, modelName) => {
  const modelFile = camelCase(modelName);
  return {
    formik: ['FormikHelpers', 'useFormik'],
    [`../${modelFile}`]: [
      `${modelName}Create`,
      ...(collectionType ? [] : [modelName]),
    ],
  };
};

const getTypeEmptyInitializer = (type, subtype) => {
  if (type === 'file') return 'null';

  const dataType = getType(type, subtype);
  if (dataType === 'boolean') return 'false';
  if (dataType === 'Date') return 'new Date()';
  if (dataType === 'number') return '0';

  return "''";
};

const getCreateInitializer = (data) => {
  let init = '';
  data.forEach((row) => {
    row.forEach(({ name, type, subtype }) => {
      if (type !== 'placeholder') {
        init += `${tab}${tab}${name}: ${getTypeEmptyInitializer(
          type,
          subtype
        )},\n`;
      }
    });
  });

  return init;
};

// TODO: Add generator for date
const generateFormBody = (formRows, mappedImport) => {
  let formTemplate = `
<Grid item xs={12} sm={9}>
  <Paper sx={{ p: 2, pb: 3 }}>
  `;
  formRows.forEach((row) => {
    let rowTemplate = `<Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>`;
    row.forEach((field) => {
      rowTemplate += generatorMap[field.type](field);
      // console.log(field.type, importMap[field.type]);
      mergeImports(mappedImport, importMap[field.type]);
    });
    rowTemplate += `</Grid>`;

    formTemplate += rowTemplate;
  });

  formTemplate += `
  </Paper>
</Grid>
`;

  return formTemplate;
};

const generateActionTab = () => `
<Grid item xs={12} sm={3}>
  <Paper sx={{ p: 2 }}>
    <Grid container>
      <Button
        type="submit"
        variant="contained"
        disabled={submitting}
        size="small"
      >
        {submitting ? 'Saving' : 'Save'}
      </Button>
    </Grid>
  </Paper>
</Grid>
`;

const generateFullForm = (body, actionBar) => {
  return `
<>
  <Box sx={{ flexGrow: 1 }}>
  <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={1}>
    ${body}
    ${actionBar}
    </Grid>
    </form>
  </Box>
</>
  `;
};

const generateClass = (form, modelName, data, collectionType) => {
  const modelInstance = camelCase(modelName);
  const modelProp = collectionType
    ? ''
    : `${modelInstance}: ${modelName} | null;`;

  const createInit = `{${getCreateInitializer(data)}}`;
  const editInit = `{${getEditInitializer(data, modelInstance)}}`;

  return `
type ${modelName}Props = {
  onSubmit: (
    value: ${modelName}Create,
    helpers: FormikHelpers<${modelName}Create>
  ) => Promise<boolean>;
  submitting: boolean;
  ${modelProp}
};

const Create${modelName}Form = ({
  onSubmit,
  submitting,
  ${collectionType ? '' : modelInstance}
}: ${modelName}Props) => {
  const handleSubmit = async (
    value: ${modelName}Create,
    helpers: FormikHelpers<${modelName}Create>
  ) => {
    const success = await onSubmit(value, helpers);
    if (success) formik.resetForm();
  };

  const initialValues: ${modelName}Create =  ${
    collectionType
      ? createInit
      : `${modelInstance} === null ? ${createInit} : ${editInit}`
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  // console.log('Edit Form', initialValues);

  return (
    ${form}
  );
};

export default Create${modelName}Form;`;
};

exports.generateCreateForm = (data, modelName, collectionType) => {
  const curMappedImport = getCreateInputMap(collectionType, modelName);

  const formBody = generateFormBody(data, curMappedImport);
  const actionTab = generateActionTab();
  const form = generateFullForm(formBody, actionTab);
  const formClass = generateClass(form, modelName, data, collectionType);

  mergeImports(curMappedImport, importMap.body);
  mergeImports(curMappedImport, importMap.actionTab);

  return `
${writeImports(curMappedImport)}
${formClass}
`;
};
