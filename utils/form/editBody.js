const { mergeImports, writeImports, tab } = require('../common-utils');
const { generatorMap, importMap } = require('./map');
const camelCase = require('camelcase');
const { getType } = require('../model/model');

const getEditInputMap = (corePrefix, modelName) => {
  const modelFile = camelCase(modelName);
  return {
    formik: ['FormikHelpers', 'useFormik'],
    [`../${modelFile}`]: [`${modelName}Edit`, modelName],
  };
};

const getTypeEditInitializer = (name, type, subtype, modelInstance) => {
  if (type === 'file') return null;

  if (getType(type, subtype) === 'Date')
    return `new Date(${modelInstance}.${name})`;

  return `${modelInstance}.${name}`;
};

const getEditInitializer = (data, modelInstance) => {
  let init = '';
  data.forEach((row) => {
    row.forEach(({ name, type, subtype }) => {
      if (type !== 'placeholder') {
        init += `${tab}${tab}${name}: ${getTypeEditInitializer(
          name,
          type,
          subtype,
          modelInstance
        )},\n`;
      }
    });
  });

  return init;
};

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

const generateClass = (form, modelName, data) => {
  const modelInstance = camelCase(modelName);

  return `
type ${modelName}Props = {
  onSubmit: (
    value: ${modelName}Edit,
    helpers: FormikHelpers<${modelName}Edit>
  ) => Promise<boolean>;
  submitting: boolean;
  ${modelInstance}: ${modelName};
};

const Edit${modelName}Form = ({
  onSubmit,
  submitting,
  ${modelInstance}
}: ${modelName}Props) => {
  const handleSubmit = async (
    value: ${modelName}Edit,
    helpers: FormikHelpers<${modelName}Edit>
  ) => {
    const success = await onSubmit(value, helpers);
    if (success) formik.resetForm();
  };

  const initialValues: ${modelName}Edit =  {
${getEditInitializer(data, modelInstance)}
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

export default Edit${modelName}Form;`;
};

exports.generateEditForm = (data, modelName, corePrefix) => {
  const curMappedImport = getEditInputMap(corePrefix, modelName);

  const formBody = generateFormBody(data, curMappedImport);
  const actionTab = generateActionTab();
  const form = generateFullForm(formBody, actionTab);
  const formClass = generateClass(form, modelName, data);

  mergeImports(curMappedImport, importMap.body);
  mergeImports(curMappedImport, importMap.actionTab);

  return `
${writeImports(curMappedImport)}
${formClass}
`;
};
