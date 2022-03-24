exports.generateFile = ({ flexGrow, name, label }) => `
<Grid item alignSelf="flex-start" sx={{ flexGrow: ${flexGrow} }}>
  <Grid item xs={12}>
    ${label}
  </Grid>
  <Box>
    <input
      type="file"
      onChange={(e) => {
        // TODO: Handle onChange
      }}
      name="${name}"
    />
  </Box>
</Grid>
`;
