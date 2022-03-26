const camelCase = require('camelcase');
const path = require('path');
const fs = require('fs');

exports.mergeImports = (combinedMap, mapItem) => {
  Object.entries(mapItem).forEach(([key, value]) => {
    if (combinedMap[key] === undefined) {
      if (typeof value === 'string') {
        combinedMap[key] = value;
      } else {
        combinedMap[key] = [];
      }
    }
    if (typeof value !== 'string') combinedMap[key].push(...value);
  });
};

const writeImports = (importMap) => {
  let output = '';
  Object.entries(importMap).forEach(([key, value]) => {
    // console.log(value, Array.isArray(value));
    if (Array.isArray(value)) {
      const components = Array.from(new Set(value)).join(', ');
      output += `import { ${components} } from "${key}";\n`;
    } else {
      output += `import ${value} from "${key}";\n`;
    }
  });

  return output;
};

exports.writeImports = writeImports;

exports.generateFolders = ({ modelName, srcPath, folderPrefix = '' }) => {
  const folderName = camelCase(modelName);
  const outputPath = path.join(srcPath, 'features', folderPrefix, folderName);
  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true, force: true });
  }

  fs.mkdirSync(outputPath, { recursive: true });

  ['components', 'containers', 'pages'].forEach((folder) => {
    fs.mkdirSync(path.join(outputPath, folder));
  });

  return outputPath;
};

exports.getCorePrefix = (folderPrefix) => {
  let corePrefix = '../..';

  if (folderPrefix) {
    const folderCount = folderPrefix.split('/').length;
    for (let i = 0; i < folderCount; i++) corePrefix += '/..';
  }

  return corePrefix;
};

exports.tab = '  ';

exports.containsFile = (data) => {
  let contains = false;
  data.forEach((row) => {
    row.forEach(({ type }) => {
      if (type === 'file') contains = true;
    });
  });

  return contains;
};

exports.getDateFields = (data) => {
  const fields = [];
  data.forEach((row) => {
    row.forEach(({ type, name }) => {
      if (type === 'date') fields.push(name);
    });
  });

  return fields;
};

exports.generateRouteManagerOutputs = (
  settings,
  { folderPrefix, modelName, url, collectionType }
) => {
  let importFolder = '../../features/';
  if (folderPrefix) {
    importFolder += `${folderPrefix}/`;
  }

  const importList = {};

  if (collectionType) {
    importList[
      `${importFolder}${camelCase(modelName)}/pages/List${modelName}Page`
    ] = `List${modelName}Page`;
  }

  if (settings.create) {
    importList[
      `${importFolder}${camelCase(modelName)}/pages/Create${modelName}Page`
    ] = `Create${modelName}Page`;
  }

  if (collectionType && settings.update) {
    importList[
      `${importFolder}${camelCase(modelName)}/pages/Edit${modelName}Page`
    ] = `Edit${modelName}Page`;
  }
  const imports = writeImports(importList);

  let routes = ``;

  if (collectionType) {
    routes += `
      <Route
        path="${url}"
        element={
          <PrivateRoute>
            <List${modelName}Page />
          </PrivateRoute>
        }
      />`;
  }

  if (settings.create) {
    routes += `
      <Route
        path="${url}/create"
        element={
          <PrivateRoute>
            <Create${modelName}Page />
          </PrivateRoute>
        }
      />`;
  }
  if (collectionType && settings.update) {
    routes += `
      <Route
        path="${url}/edit/:id"
        element={
          <PrivateRoute>
            <Edit${modelName}Page />
          </PrivateRoute>
        }
      />`;
  }

  console.log(
    'Copy to src/core/containers/RouteManager\n\n',
    imports,
    '\n',
    routes
  );

  const sidebar = `<SidebarLink to="${url}" label="${modelName}" active={location.pathname.startsWith("${url}")} />`;

  console.log('Copy to src/core/ui/layout/components/Sidebar\n\n', sidebar);
};
