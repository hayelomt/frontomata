exports.generateCheckbox = ({ flexGrow, name, label }) => `
<Grid item alignSelf="flex-start" sx={{ flexGrow: ${flexGrow} }}>
  <FormControl error>
    <FormControlLabel
      control={<Checkbox name="${name}" checked={formik.values.${name}} onChange={formik.handleChange} />}
      label="${label}"
    />
    { Boolean(formik.errors.${name}) && <FormHelperText>{formik.errors.${name}}</FormHelperText> }
  </FormControl>
</Grid>
`;
