const { generateFolders, getCorePrefix } = require('./common-utils');
const path = require('path');
const { writeModel } = require('./model/modelGenerator');
const { writeForm } = require('./form/formGenerator');
const { writeCreateContainer } = require('./container/createContainer');
const { writeCreatePage } = require('./page/createPage');

const data = [
  [
    {
      type: 'text',
      subtype: 'text',
      name: 'title',
      label: 'Title',
      flexGrow: 1,
      placeholder: 'Title',
    },
    {
      type: 'placeholder',
      flexGrow: 2,
    },
    {
      type: 'text',
      subtype: 'number',
      name: 'counter',
      label: 'Counter',
      flexGrow: 1,
      placeholder: 'Counter',
    },
  ],
  [
    {
      type: 'textarea',
      subtype: 'text',
      name: 'description',
      label: 'Description',
      flexGrow: 1,
      placeholder: 'Description',
    },
  ],
  [
    {
      type: 'file',
      name: 'image',
      label: 'Profile Image',
      flexGrow: 1,
    },
  ],
  [
    {
      type: 'select',
      flexGrow: 1,
      name: 'selection',
      label: 'Drop',
      options: [
        { value: 'ten', label: 'Ten' },
        { value: 'twenty', label: 'Twenty' },
        { value: 'thirty', label: 'Thirty' },
      ],
    },
  ],
  [
    {
      type: 'radio',
      flexGrow: 1,
      name: 'color',
      label: 'Favorite color',
      options: [
        { value: 'green', label: 'Green' },
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
      ],
    },
    {
      type: 'radio',
      subtype: 'number',
      flexGrow: 1,
      name: 'tune_level',
      label: 'Tune level',
      options: [
        { value: 10, label: 10 },
        { value: 20, label: 20 },
        { value: 30, label: 30 },
      ],
    },
  ],
  [
    {
      type: 'checkbox',
      flexGrow: 1,
      name: 'conditions',
      label: 'Accept TOS',
    },
  ],
  [
    {
      type: 'date',
      name: 'created_at',
      label: 'Created At',
    },
  ],
];

const srcPath = path.join(__dirname, '..', 'src');
const folderPrefix = '';
const modelName = 'Blog';

const generateCode = async () => {
  const corePrefix = getCorePrefix(folderPrefix);

  const baseOutputFolder = generateFolders({
    modelName,
    srcPath,
    folderPrefix,
  });
  writeModel({}, { data, modelName, corePrefix, baseOutputFolder });

  // Create
  writeForm({}, { data, modelName, corePrefix, baseOutputFolder });
  writeCreateContainer({
    data,
    modelName,
    endpoint: '/blogs',
    corePrefix,
    baseOutputFolder,
  });
  writeCreatePage({ modelName, corePrefix, baseOutputFolder });
};

generateCode();
