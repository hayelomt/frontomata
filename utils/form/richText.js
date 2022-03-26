exports.generateRichtext = ({ flexGrow, name, label, placeholder }) => `
<Grid item alignSelf="flex-start" sx={{ flexGrow: ${flexGrow} }}>
  <Grid item xs={12}>
    ${label}
  </Grid>
  <ReactQuill
    modules={richTextModules}
    value={formik.values.${name}}
    onChange={(e) => {
      formik.setFieldValue('${name}', e);
    }}
    placeholder="${placeholder || ''}"
  />
  {formik.touched.${name} && formik.errors.${name} && (
    <FormHelperText error>
      {formik.errors.${name}}
    </FormHelperText>
  )}
</Grid>
`;
