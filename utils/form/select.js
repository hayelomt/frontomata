const { genValue } = require('./formUtils');

exports.generateSelect = ({ flexGrow, name, label, options }) => {
  const genMenuItems = () =>
    options
      .map(
        (option) =>
          `<MenuItem value=${genValue(option.value)}>${option.label}</MenuItem>`
      )
      .join('\n');

  return `
<Grid item alignSelf="flex-start" sx={{ flexGrow: ${flexGrow} }}>
  <FormControl sx={{ minWidth: 120 }} 
  error={Boolean(formik.errors.${name})}
  >
    <InputLabel>${label}</InputLabel>
    <Select
      value={formik.values.${name}}
      label="${label}"
      onChange={formik.handleChange}
      name="${name}"
    >
      ${genMenuItems(options)}
    </Select>
    { Boolean(formik.errors.${name}) && <FormHelperText>{formik.errors.${name}}</FormHelperText> }
  </FormControl>
</Grid>
  `;
};
