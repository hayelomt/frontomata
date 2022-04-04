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
    [`${corePrefix}/../core/ui/layout/Layout`]: 'Layout',
    [`${corePrefix}/../core/hooks/useSendApiData`]: ['useSendApiData'],
    [`${corePrefix}/../core/utils/ui/alert`]: ['toastError', 'toastMessage'],
    [`${corePrefix}/../core/utils/validation`]: ['parseValidationErrors'],
    [`${corePrefix}/../core/hooks/useFetchApiData`]: 'useFetchApiData',
    [`${corePrefix}/../core/ui/utility/Loader`]: 'Loader',
    [`../${camelCase(modelName)}`]: [`${modelName}Edit`, modelName],
    [`../components/Edit${modelName}Form`]: `Edit${modelName}Form`,
    [`${corePrefix}/../core/ui/utility/ReturnButton`]: 'ReturnButton',
    [`${corePrefix}/../core/utils/utility`]: ['parseFormQuery'],
  };
};

const mapInputData = (templateData) => {
  const dateFields = getDateFields(templateData);

  return `const formData: any = parseFormQuery(values, ${JSON.stringify(
    dateFields
  )})`;
};

const generateContainer = ({ data, modelName, endpoint, url }) => {
  // eslint-disable-next-line no-template-curly-in-string
  const id = '${id}';
  const baseEndpoint = `${endpoint.read}/${id}`;
  const basePatchEndpoint = `${endpoint.update}/${id}`;
  const patchEndpoint = containsFile(data)
    ? `${basePatchEndpoint}?_method=PATCH`
    : basePatchEndpoint;
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
      },
    });
  };

  return (
    <Layout renderLeftToolbar={() => <ReturnButton to="${url}" />}>
      <Loader loading={loading || !${modelInstance}}>
        <Grid sx={{ p: 2 }}>  
          <Grid container sx={{ mb: 1, px: 1 }}>
            <Typography variant="h5">Edit ${modelName}</Typography>
          </Grid>
          <Edit${modelName}Form ${modelInstance}={${modelInstance}!} onSubmit={handleSubmit} submitting={submitting} />
        </Grid>
      </Loader>
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
  url,
  baseOutputFolder,
}) => {
  let output = writeImports(getContainerImports(modelName, corePrefix)) + '\n';
  output += generateContainer({ data, modelName, endpoint, url });

  fs.writeFileSync(
    path.join(baseOutputFolder, 'containers', `Edit${modelName}Container.tsx`),
    output
  );
};
