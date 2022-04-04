exports.generateDate = ({ flexGrow, name, label }) => `
<Grid
  item
  sx={{
    flexGrow: ${flexGrow},
    padding: '0 !important',
  }}
  display="flex"
  flexDirection="column"
  alignItems="flex-start"
  justifyContent="center"
>
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingLeft: '8px',
    }}
  >
    <Typography sx={{ p: 0, mr: 1 }}>${label}</Typography>
    <Grid item alignItems="flex-end">
      <DateTimePicker
        onChange={(e) => {
          formik.setFieldValue('${name}', e);
        }}
        value={formik.values.${name} || new Date()}
        disableClock
        format="y-MM-dd"
      />
    </Grid>
  </div>
  {formik.touched.${name} && formik.errors.${name} && (
    <FormHelperText error>
      {formik.errors.${name}}
    </FormHelperText>
  )}
</Grid>
`;
