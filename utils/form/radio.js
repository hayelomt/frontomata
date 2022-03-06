const { genValue } = require('./formUtils');

exports.generateRadio = ({ flexGrow, name, label, options }) => {
  const genRadioOptions = () =>
    options
      .map(
        (option) =>
          `<FormControlLabel
            value=${genValue(option.value)}
            control={<Radio />}
            label="${option.label}"
          />`
      )
      .join('\n');

  return `
<Grid item alignSelf="flex-start" sx={{ flexGrow: ${flexGrow} }}>
  <FormControl
    sx={{ flexGrow: 1, minWidth: 120 }}
    error={Boolean(formik.errors.${name})}
  >
    <FormLabel>${label}</FormLabel>
    <RadioGroup
      defaultValue="female"
      name="${name}"
      value={formik.values.${name}}
      onChange={formik.handleChange}
    >
      ${genRadioOptions()}
    </RadioGroup>
    { Boolean(formik.errors.${name}) && <FormHelperText>{formik.errors.${name}}</FormHelperText> }
  </FormControl>
</Grid>
  `;
};
