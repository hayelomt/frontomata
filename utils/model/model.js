const { tab } = require('../common-utils');

const getType = (type, subtype) => {
  if (type === 'checkbox') return 'boolean';
  if (subtype === 'number') return 'number';
  if (type === 'date') return 'Date';
  if (type === 'file') return 'File | null';

  return 'string';
};

const generateBaseFields = (data, { edit } = { edit: false }) => {
  let template = '';

  data.forEach((row) => {
    row.forEach(({ name, type, subtype }) => {
      if (type !== 'placeholder') {
        template += `${tab}${name}${edit ? '?' : ''}: ${getType(
          type,
          subtype
        )};\n`;
      }
    });
  });

  return template;
};

exports.generateModelImports = (srcPath) => {
  return {
    [`${srcPath}/core/utils/types`]: ['Model'],
  };
};

exports.generateModelType = (modelName, data) => {
  let modelTemplate = `export type ${modelName} = {\n`;
  modelTemplate += generateBaseFields(data);
  modelTemplate += '} & Model;';

  return modelTemplate;
};

exports.generateModelCreateType = (modelName, data) => {
  let inputTemplate = `export type ${modelName}Create = {\n`;
  inputTemplate += generateBaseFields(data);
  inputTemplate += '}';

  return inputTemplate;
};

exports.generateModelEditType = (modelName, data) => {
  let inputTemplate = `export type ${modelName}Edit = {\n`;
  inputTemplate += generateBaseFields(data, { edit: true });
  inputTemplate += '}';

  return inputTemplate;
};

exports.getType = getType;
