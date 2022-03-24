const fs = require('fs');
const path = require('path');
const { writeImports } = require('../common-utils');

const getImportMap = (modelName) => {
  return {
    [`../containers/Edit${modelName}Container`]: `Edit${modelName}Container`,
  };
};

const generatePage = (modelName) => {
  return `const Edit${modelName}Page = () => {
  return (
    <Edit${modelName}Container />
  );
};

export default Edit${modelName}Page;
`;
};

exports.writeEditPage = ({ modelName, corePrefix, baseOutputFolder }) => {
  let output = writeImports(getImportMap(modelName, corePrefix)) + '\n';
  output += generatePage(modelName);

  fs.writeFileSync(
    path.join(baseOutputFolder, 'pages', `Edit${modelName}Page.tsx`),
    output
  );
};
