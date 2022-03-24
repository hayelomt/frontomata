const camelCase = require('camelcase');
const path = require('path');
const fs = require('fs');
const {
  generateModelCreateType,
  generateModelType,
  generateModelImports,
  generateModelEditType,
} = require('./model');
const { writeImports } = require('../common-utils');

exports.writeModel = (
  settings,
  { data, modelName, corePrefix, baseOutputFolder }
) => {
  let output = writeImports(generateModelImports(corePrefix)) + '\n';

  output += generateModelType(modelName, data) + '\n\n';
  if (settings.create) {
    output += generateModelCreateType(modelName, data) + '\n';
  }
  if (settings.update) {
    output += generateModelEditType(modelName, data);
  }

  // console.dir(output);
  const modelFile = camelCase(modelName);

  fs.writeFileSync(path.join(baseOutputFolder, `${modelFile}.ts`), output);
};
