const fs = require('fs');
const path = require('path');
const { writeImports } = require('../common-utils');

const getImportMap = (modelName, corePrefix) => {
  return {
    [`${corePrefix}/../core/components/layout/Layout`]: 'Layout',
    [`../containers/Create${modelName}Container`]: `Create${modelName}Container`,
  };
};

const generatePage = (modelName) => {
  return `const Create${modelName}Page = () => {
  return (
    <Layout>
      <Create${modelName}Container />
    </Layout>
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
