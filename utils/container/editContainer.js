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
    'react-router-dom': ['useParams'],
    react: ['useState', 'useEffect'],
    [`${corePrefix}/../core/components/layout/Layout`]: 'Layout',
    [`${corePrefix}/../core/hooks/useSendApiData`]: ['useSendApiData'],
    [`${corePrefix}/../core/utils/ui/alert`]: ['toastError', 'toastMessage'],
    [`${corePrefix}/../core/utils/validation`]: ['parseValidationErrors'],
    [`${corePrefix}/../core/hooks/useFetchApiData`]: 'useFetchApiData',
    [`${corePrefix}/../core/components/utility/Loading`]: 'Loading',
    [`../${camelCase(modelName)}`]: [`${modelName}Edit`, modelName],
    [`../components/Edit${modelName}Form`]: `Edit${modelName}Form`,
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
  // eslint-disable-next-line no-template-curly-in-string
  const id = '${id}';
  const baseEndpoint = `${endpoint}/${id}`;
  const patchEndpoint = containsFile(data)
    ? `${baseEndpoint}?_method=PATCH`
    : baseEndpoint;
  const method = containsFile(data) ? 'post' : 'patch';
  const modelInstance = camelCase(modelName);

  return `const Edit${modelName}Container = () => {
  const { id } = useParams();
  const { callApi, loading: submitting } = useSendApiData();
  const { fetchData, loading } = useFetchApiData();
  const [${modelInstance}, set${modelName}] = useState<${modelName} | null>(null);

  const fetch${modelName} = () =>
    fetchData(\`${baseEndpoint}\`, {
      onSuccess: (data: ${modelName}) => {
        set${modelName}(data);
      },
    });

  useEffect(() => {
    fetch${modelName}();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (
    values: ${modelName}Edit,
    { setFieldError }: FormikHelpers<${modelName}Edit>
  ) => {
    let success = false;

    ${mapInputData(data)}

    await callApi({
      endpoint: \`${patchEndpoint}\`,
      method: '${method}',
      data: formData,
      headers: {
        'Content-Type': '${
          containsFile(data) ? 'multipart/form-data' : 'application/json'
        }'
      },
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (_) => {
        await fetch${modelName};
        toastMessage('${modelName} Edited');
        success = true;
      },
    });

    return success;
  };

  if (loading || !${modelInstance}) return <Loading />;

  return (
    <Layout>
      <>
        <Grid container sx={{ mb: 1, px: 1 }}>
          <Typography variant="h5">Add ${modelName}</Typography>
        </Grid>
        <Edit${modelName}Form ${modelInstance}={${modelInstance}!} onSubmit={handleSubmit} submitting={submitting} />
      </>
    </Layout>
  );
};

export default Edit${modelName}Container;
`;
};

exports.writeEditContainer = ({
  data,
  modelName,
  endpoint,
  corePrefix,
  baseOutputFolder,
}) => {
  let output = writeImports(getContainerImports(modelName, corePrefix)) + '\n';
  output += generateContainer({ data, modelName, endpoint });

  fs.writeFileSync(
    path.join(baseOutputFolder, 'containers', `Edit${modelName}Container.tsx`),
    output
  );
};
