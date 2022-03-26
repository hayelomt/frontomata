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
    url,
    settings,
    collectionType,
  } = require(`./templates/${templateFile}`);
  const corePrefix = getCorePrefix(folderPrefix);

  const baseOutputFolder = generateFolders({
    modelName,
    srcPath,
    folderPrefix,
  });

  // Model
  writeModel(settings, {
    data,
    modelName,
    corePrefix,
    baseOutputFolder,
    collectionType,
  });

  // List
  if (collectionType) {
    writeListContainer({
      data,
      modelName,
      modelToken,
      url,
      endpoint,
      corePrefix,
      baseOutputFolder,
      settings,
    });
    writeListPage({ modelName, corePrefix, baseOutputFolder });
  }

  // Create related files
  if (settings.create) {
    writeCreateForm({
      data,
      modelName,
      corePrefix,
      baseOutputFolder,
      collectionType,
    });
    writeCreateContainer({
      data,
      modelName,
      endpoint,
      url,
      corePrefix,
      baseOutputFolder,
      collectionType,
    });
    writeCreatePage({ modelName, corePrefix, baseOutputFolder });
  }

  // Edit related files
  if (collectionType && settings.update) {
    writeEditForm({ data, modelName, corePrefix, baseOutputFolder });
    writeEditContainer({
      data,
      modelName,
      endpoint,
      url,
      corePrefix,
      baseOutputFolder,
    });
    writeEditPage({ modelName, corePrefix, baseOutputFolder });
  }

  // Copy paste output
  generateRouteManagerOutputs(settings, {
    modelName,
    folderPrefix,
    url,
    collectionType,
  });
};

console.log(process.argv[2]);

if (!process.argv[2]) {
  console.log('Specify template file path');
} else {
  generateCode(process.argv[2]);
}
