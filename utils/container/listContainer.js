const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const { tab, writeImports } = require('../common-utils');

const getListImports = (modelName, corePrefix) => {
  return {
    '@mui/material': ['Box'],
    react: ['useState'],
    [`${corePrefix}/../core/hooks/useFetchApiData`]: 'useFetchApiData',
    [`${corePrefix}/../core/ui/layout/Layout`]: 'Layout',
    [`${corePrefix}/../core/ui/table/TableContainer`]: 'TableContainer',
    [`${corePrefix}/../core/ui/table/tableTypes`]: ['TableHeader'],
    [`${corePrefix}/../core/utils/types`]: ['Paginated'],
    [`${corePrefix}/../core/utils/utility`]: ['parseQuery'],
    [`../${camelCase(modelName)}`]: [modelName],
    [`${corePrefix}/../core/hooks/useSendApiData`]: ['useSendApiData'],
    [`${corePrefix}/../core/utils/ui/alert`]: ['toastError', 'toastMessage'],
  };
};

const generateTableHeader = (data) => {
  let template = 'const tableHeaders: TableHeader[] = [\n';

  const displayFields = [];
  data.forEach((row) => {
    displayFields.push(...row.filter((item) => item.showOnTable));
  });

  template += displayFields
    .map(
      ({ name, tableLabel, align }) =>
        `${tab}{ field: '${name}', label: '${tableLabel || name}', align: '${
          align || 'left'
        }' },`
    )
    .join('\n');

  template += '\n];';

  return template;
};

const generateListClass = ({
  settings,
  modelName,
  url,
  endpoint,
  modelToken,
}) => {
  const deleteAction = `const handleDelete = async (id: number | string, showMessage = true) => {
    let success = false;

    await callApi({
      endpoint: \`${endpoint.delete}/\${id}\`,
      data: {},
      method: 'delete',
      onSuccess: async () => {
        if (showMessage) toastMessage('Project Removed');
        success = true;
      },
      onError: () => {
        if (showMessage) toastError('Something went wrong while deleting. Try again');
      },
    });

    return success;
  };`;

  return `const ${modelName}List = () => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const { fetchData } = useFetchApiData();
  const { callApi } = useSendApiData();

  const handleFetchData = async (query: any, cb: (c: number) => void) => {

    await fetchData(\`${endpoint.read}\${parseQuery(query)}\`, {
      onSuccess: ({ total, data: apiData }: Paginated<${modelName}>) => {
        setData(apiData);
        cb(total);
      },
    });
  };

  ${settings.delete ? deleteAction : ''}
  
  return (
    <>
      <Layout>
        <Box sx={{ p: 2 }}>
          <TableContainer
            modelToken="${modelToken}"
            tableHeaders={tableHeaders}
            data={data}
            modelLabel="${modelName}s"
            addRoute="${url}/create"
            editRoutePrefix="${url}/edit"
            actions={{
              onFetchData: handleFetchData,
              ${settings.delete ? 'onDelete: handleDelete,' : ''}
            }}
            settings={{
              canCreate: ${settings.create},
              canEdit: ${settings.update},
              canDelete: ${settings.delete},
            }}
          />
        </Box>
      </Layout>
    </>
  );
};

export default ${modelName}List;
`;
};

exports.writeListContainer = ({
  data,
  modelName,
  modelToken,
  url,
  endpoint,
  corePrefix,
  baseOutputFolder,
  settings,
}) => {
  let template = writeImports(getListImports(modelName, corePrefix)) + '\n';
  template += generateTableHeader(data) + '\n';
  template += generateListClass({
    settings,
    modelName,
    modelToken,
    url,
    endpoint,
  });

  fs.writeFileSync(
    path.join(baseOutputFolder, 'components', `${modelName}List.tsx`),
    template
  );
};
