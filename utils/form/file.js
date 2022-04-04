exports.generateFile = ({ flexGrow, name, label }) => `
<Grid item alignSelf="flex-start" sx={{ flexGrow: ${flexGrow} }}>
  <Grid item xs={12}>
    ${label}
  </Grid>
  <Box>
    <input
      type="file"
      onChange={({ target: { files } }) => {
        formik.setFieldValue(
          '${name}',
          files && files.length ? files[0] : null
        );
      }}
      name="${name}"
    />
  </Box>
  {formik.touched.${name} && formik.errors.${name} && (
    <FormHelperText error>
      {formik.errors.${name}}
    </FormHelperText>
  )}
</Grid>
`;
