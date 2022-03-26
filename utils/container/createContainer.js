const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const {
  containsFile,
  getDateFields,
  writeImports,
} = require('../common-utils');

const getContainerImports = (modelName, corePrefix, collectionType) => {
  const imports = {
    '@mui/material': ['Grid', 'Typography'],
    formik: ['FormikHelpers'],
    'react-router-dom': ['useNavigate'],
    [`${corePrefix}/../core/ui/layout/Layout`]: 'Layout',
    [`${corePrefix}/../core/hooks/useSendApiData`]: ['useSendApiData'],
    [`${corePrefix}/../core/utils/ui/alert`]: ['toastError', 'toastMessage'],
    [`${corePrefix}/../core/utils/validation`]: ['parseValidationErrors'],
    [`../${camelCase(modelName)}`]: [
      `${modelName}Create`,
      ...(collectionType ? [] : [modelName]),
    ],
    [`../components/Create${modelName}Form`]: `Create${modelName}Form`,
    [`${corePrefix}/../core/ui/utility/ReturnButton`]: 'ReturnButton',
  };

  if (!collectionType) {
    imports['react'] = ['useState', 'useEffect'];
    imports[`${corePrefix}/../core/hooks/useFetchApiData`] = 'useFetchApiData';
    imports[`${corePrefix}/../core/ui/utility/Loading`] = 'Loading';
  }

  return imports;
};

const mapInputData = (templateData) => {
  if (containsFile(templateData)) {
    const dateFields = getDateFields(templateData);

    if (dateFields.length) {
      return `const formData: any = new FormData();
    const dateFields: string[] = ${JSON.stringify(dateFields)}
    Object.entries(values).forEach(([key, val]) => {
      if (dateFields.includes(key)) {
        formData.append(key, (val as Date).toISOString().substring(0, 10));
      } else {
        formData.append(key, val as Blob);
      }
    });`;
    } else {
      return `const formData: any = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      formData.append(key, val as Blob);
    });`;
    }
  } else {
    return `const formData: any = { ...values };
    const dateFields: string[] = ${JSON.stringify(getDateFields(templateData))};
    dateFields.forEach((field) => {
      if (formData[field]) {
        formData[field] = formData[field].toISOString()
        .substring(0, 10) as unknown as Date;
      }
    });`;
  }
};

const generateContainer = ({
  data,
  modelName,
  endpoint,
  url,
  collectionType,
}) => {
  const modelInstance = camelCase(modelName);

  return `const Create${modelName}Container = () => {
  const navigate = useNavigate();
  const { callApi, loading: submitting } = useSendApiData();
  ${
    collectionType
      ? ''
      : `const { fetchData, loading } = useFetchApiData();
  const [${modelInstance}, set${modelName}] = useState<${modelName} | null>(null);

  const fetch${modelName} = () =>
    fetchData(\`${endpoint.read}\`, {
      onSuccess: (data: ${modelName}) => {
        set${modelName}(data);
      },
    });

  useEffect(() => {
    fetch${modelName}();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);`
  }

  const handleSubmit = async (
    values: ${modelName}Create,
    { setFieldError }: FormikHelpers<${modelName}Create>
  ) => {
    let success = false;

    ${mapInputData(data)}

    await callApi({
      endpoint: '${endpoint.create}',
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
  ${
    collectionType
      ? ''
      : `if (loading || !${modelInstance}) return <Loading />;`
  }

  return (
    <Layout renderLeftToolbar={() => <ReturnButton to="${url}" />}>
      <Grid sx={{ p: 2 }}>
        <Grid container sx={{ mb: 2, px: 1 }}>
          <Typography variant="h5">Add ${modelName}</Typography>
        </Grid>
        <Create${modelName}Form ${
    collectionType ? '' : `${modelInstance}={${modelInstance}}`
  } onSubmit={handleSubmit} submitting={submitting} />
      </Grid>
    </Layout>
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
  url,
  collectionType,
}) => {
  let output =
    writeImports(getContainerImports(modelName, corePrefix, collectionType)) +
    '\n';
  output += generateContainer({
    data,
    modelName,
    endpoint,
    url,
    collectionType,
  });

  fs.writeFileSync(
    path.join(
      baseOutputFolder,
      'containers',
      `Create${modelName}Container.tsx`
    ),
    output
  );
};
