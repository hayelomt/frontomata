exports.generateDate = ({ flexGrow, name, label }) => `
<Grid item sx={{ flexGrow: ${flexGrow} }} alignItems="flex-end">

  <Grid item>${label}</Grid>
  <Grid item alignItems="flex-end">
    <DatePicker
      selected={formik.values.${name} || new Date()}
      onChange={(e) => {
        formik.setFieldValue('${name}', e);
      }}
      dateFormat="yyyy/MM/dd"
    />
  </Grid>
  <Grid item xs={12}>
    {formik.touched.${name} && formik.errors.${name} && (
      <FormHelperText error>
        {formik.errors.${name}}
      </FormHelperText>
    )}
  </Grid>
</Grid>
`;
