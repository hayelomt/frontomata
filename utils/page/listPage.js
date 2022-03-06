const fs = require('fs');
const path = require('path');
const { writeImports } = require('../common-utils');

const getImportMap = (modelName, corePrefix) => {
  return {
    [`../components/${modelName}List`]: `${modelName}List`,
  };
};

const generatePage = (modelName) => {
  return `const List${modelName}Page = () => {
  return (
    <${modelName}List />
  );
};

export default List${modelName}Page;
`;
};

exports.writeListPage = ({ modelName, corePrefix, baseOutputFolder }) => {
  let output = writeImports(getImportMap(modelName, corePrefix)) + '\n';
  output += generatePage(modelName);

  fs.writeFileSync(
    path.join(baseOutputFolder, 'pages', `List${modelName}Page.tsx`),
    output
  );
};
