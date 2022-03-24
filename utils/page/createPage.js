const fs = require('fs');
const path = require('path');
const { writeImports } = require('../common-utils');

const getImportMap = (modelName, corePrefix) => {
  return {
    [`../containers/Create${modelName}Container`]: `Create${modelName}Container`,
  };
};

const generatePage = (modelName) => {
  return `const Create${modelName}Page = () => {
  return (
    <Create${modelName}Container />
  );
};

export default Create${modelName}Page;
`;
};

exports.writeCreatePage = ({ modelName, corePrefix, baseOutputFolder }) => {
  let output = writeImports(getImportMap(modelName, corePrefix)) + '\n';
  output += generatePage(modelName);

  fs.writeFileSync(
    path.join(baseOutputFolder, 'pages', `Create${modelName}Page.tsx`),
    output
  );
};
