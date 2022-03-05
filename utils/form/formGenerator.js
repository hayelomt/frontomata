const fs = require('fs');
const path = require('path');
const { generateCreateForm } = require('./body');

exports.writeForm = (
  settings,
  { data, modelName, baseOutputFolder, corePrefix }
) => {
  const createForm = generateCreateForm(data, modelName, corePrefix);
  fs.writeFileSync(
    path.join(baseOutputFolder, 'components', `Create${modelName}Form.tsx`),
    createForm
  );
};
