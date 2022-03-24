exports.generateTextarea = ({
  flexGrow,
  name,
  label,
  placeholder,
  subtype,
}) => `
<Grid item alignSelf="flex-start" sx={{ flexGrow: ${flexGrow} }}>
  <TextField
    fullWidth
    name="${name}"
    size="small"
    type="${subtype || 'text'}"
    variant="outlined"
    label="${label}"
    placeholder="${placeholder || ''}"
    value={formik.values.${name}}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.${name})}
    helperText={formik.errors.${name}}
    multiline
    rows={4}
  />
</Grid>
`;
