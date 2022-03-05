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

exports.writeImports = (importMap) => {
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
