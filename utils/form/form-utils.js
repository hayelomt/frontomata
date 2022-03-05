const genValue = (item) =>
  typeof item === 'number' ? `{${item}}` : `"${item}"`;

const generatePlaceholder = ({ flexGrow }) => `
<Grid item sx={{ flexGrow: ${flexGrow} }}></Grid>
`;

module.exports = {
  genValue,
  generatePlaceholder,
};
