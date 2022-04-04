const fs = require('fs');
const path = require('path');
const { generateCreateForm } = require('./createBody');
const { generateEditForm } = require('./editBody');

exports.writeCreateForm = ({
  data,
  modelName,
  baseOutputFolder,
  collectionType,
  url,
}) => {
  const createForm = generateCreateForm(data, modelName, collectionType, url);
  fs.writeFileSync(
    path.join(baseOutputFolder, 'components', `Create${modelName}Form.tsx`),
    createForm
  );
};

exports.writeEditForm = ({ data, modelName, baseOutputFolder, corePrefix }) => {
  const createForm = generateEditForm(data, modelName, corePrefix);
  fs.writeFileSync(
    path.join(baseOutputFolder, 'components', `Edit${modelName}Form.tsx`),
    createForm
  );
};
