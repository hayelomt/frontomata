const {
  generateFolders,
  getCorePrefix,
  generateRouteManagerOutputs,
} = require('./common-utils');
const path = require('path');
const { writeModel } = require('./model/modelGenerator');
const { writeCreateForm, writeEditForm } = require('./form/formGenerator');
const { writeCreateContainer } = require('./container/createContainer');
const { writeCreatePage } = require('./page/createPage');
const { writeEditContainer } = require('./container/editContainer');
const { writeEditPage } = require('./page/editPage');
const { writeListContainer } = require('./container/listContainer');
const { writeListPage } = require('./page/listPage');

const srcPath = path.join(__dirname, '..', 'src');

const generateCode = async (templateFile) => {
  const {
    data,
    folderPrefix,
    modelName,
    modelToken,
    endpoint,
  } = require(`./templates/${templateFile}`);
  const corePrefix = getCorePrefix(folderPrefix);

  const baseOutputFolder = generateFolders({
    modelName,
    srcPath,
    folderPrefix,
  });

  // Model
  writeModel({}, { data, modelName, corePrefix, baseOutputFolder });

  // List
  writeListContainer({
    data,
    modelName,
    modelToken,
    endpoint,
    corePrefix,
    baseOutputFolder,
  });
  writeListPage({ modelName, corePrefix, baseOutputFolder });

  // Create
  writeCreateForm({ data, modelName, corePrefix, baseOutputFolder });
  writeCreateContainer({
    data,
    modelName,
    endpoint,
    corePrefix,
    baseOutputFolder,
  });
  writeCreatePage({ modelName, corePrefix, baseOutputFolder });

  // Edit
  writeEditForm({ data, modelName, corePrefix, baseOutputFolder });
  writeEditContainer({
    data,
    modelName,
    endpoint,
    corePrefix,
    baseOutputFolder,
  });
  writeEditPage({ modelName, corePrefix, baseOutputFolder });

  // Copy paste output
  generateRouteManagerOutputs({}, { modelName, folderPrefix, endpoint });
};

console.log(process.argv[2]);

if (!process.argv[2]) {
  console.log('Specify template file path');
} else {
  generateCode(process.argv[2]);
}
