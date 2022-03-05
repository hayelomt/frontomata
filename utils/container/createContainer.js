const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const {
  containsFile,
  getDateFields,
  writeImports,
} = require('../common-utils');

const getContainerImports = (modelName, corePrefix) => {
  return {
    '@mui/material': ['Grid', 'Typography'],
    formik: ['FormikHelpers'],
    'react-router-dom': ['useNavigate'],
    [`${corePrefix}/../core/hooks/useSendApiData`]: ['useSendApiData'],
    [`${corePrefix}/../core/utils/ui/alert`]: ['toastError', 'toastMessage'],
    [`${corePrefix}/../core/utils/validation`]: ['parseValidationErrors'],
    [`../${camelCase(modelName)}`]: [`${modelName}Create`],
    [`../components/Create${modelName}Form`]: `Create${modelName}Form`,
  };
};

const mapInputData = (templateData) => {
  if (containsFile(templateData)) {
    const dateFields = getDateFields(templateData);

    if (dateFields.length) {
      return `const formData = new FormData();
    const dateFields: string[] = ${JSON.stringify(dateFields)}
    Object.entries(values).forEach(([key, val]) => {
      if (dateFields.includes(key)) {
        formData.append(key, (val as Date).toISOString().substring(0, 10));
      } else {
        formData.append(key, val as Blob);
      }
    });`;
    } else {
      return `const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      formData.append(key, val as Blob);
    });`;
    }
  } else {
    return `const formData = { ...values };
    const dateFields: string[] = ${JSON.stringify(getDateFields(templateData))};
    dateFields.forEach((field) => {
      if (formData[field]) {
        formData[field] = formData[field].toISOString()
        .substring(0, 10) as unknown as Date;
      }
    });`;
  }
};

const generateContainer = ({ data, modelName, endpoint }) => {
  return `const Create${modelName}Container = () => {
  const navigate = useNavigate();
  const { callApi, loading: submitting } = useSendApiData();

  const handleSubmit = async (
    values: ${modelName}Create,
    { setFieldError }: FormikHelpers<${modelName}Create>
  ) => {
    let success = false;

    ${mapInputData(data)}

    await callApi({
      endpoint: '${endpoint}',
      data: formData,
      headers: {
        'Content-Type': '${
          containsFile(data) ? 'multipart/form-data' : 'application/json'
        }'
      },
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (_) => {
        toastMessage('${modelName} Created');
        success = true;
      },
    });

    if (success) navigate('/testimonies', { replace: true });

    return success;
  };

  return (
    <>
      <Grid container sx={{ mb: 1, px: 1 }}>
        <Typography variant="h5">Add ${modelName}</Typography>
      </Grid>
      <Create${modelName}Form onSubmit={handleSubmit} submitting={submitting} />
    </>
  );
};

export default Create${modelName}Container;
`;
};

exports.writeCreateContainer = ({
  data,
  modelName,
  endpoint,
  corePrefix,
  baseOutputFolder,
}) => {
  let output = writeImports(getContainerImports(modelName, corePrefix)) + '\n';
  output += generateContainer({ data, modelName, endpoint });

  fs.writeFileSync(
    path.join(
      baseOutputFolder,
      'containers',
      `Create${modelName}Container.tsx`
    ),
    output
  );
};
