const { generateText } = require('./text');
const { generateTextarea } = require('./textarea');
const { generateCheckbox } = require('./checkbox');
const { generateSelect } = require('./select');
const { generateRadio } = require('./radio');
const { generateFile } = require('./file');
const { generateDate } = require('./date');
const { generatePlaceholder } = require('./formUtils');

exports.importMap = {
  text: {
    '@mui/material': ['Grid', 'TextField'],
  },
  textarea: {
    '@mui/material': ['Grid', 'TextField'],
  },
  checkbox: {
    '@mui/material': [
      'Grid',
      'FormControl',
      'FormControlLabel',
      'FormHelperText',
      'Checkbox',
    ],
  },
  select: {
    '@mui/material': [
      'Grid',
      'FormControl',
      'InputLabel',
      'FormHelperText',
      'Select',
      'MenuItem',
    ],
  },
  radio: {
    '@mui/material': [
      'Grid',
      'FormControl',
      'FormControlLabel',
      'FormHelperText',
      'Radio',
      'FormLabel',
      'RadioGroup',
    ],
  },
  file: {
    '@mui/material': ['Grid', 'Box'],
  },
  date: {
    'react-datepicker': 'DatePicker',
    '@mui/material': ['Grid', 'FormHelperText'],
  },
  placeholder: {
    '@mui/material': ['Grid'],
  },
  actionTab: {
    '@mui/material': ['Grid', 'Paper', 'Button'],
  },
  body: {
    '@mui/material': ['Grid', 'Paper', 'Box'],
  },
};

exports.generatorMap = {
  text: generateText,
  date: generateDate,
  textarea: generateTextarea,
  checkbox: generateCheckbox,
  select: generateSelect,
  radio: generateRadio,
  placeholder: generatePlaceholder,
  file: generateFile,
};
