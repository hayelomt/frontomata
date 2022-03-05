import { Sync } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

const Loading = () => {
  return (
    <>
      <Box sx={{ height: '100vh' }}>
        <Grid
          sx={{
            flexGrow: 1,
            flexDirection: 'column',
            height: '100%',
          }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Sync
            style={{ animation: 'spinner infinite 2s linear' }}
            fontSize="large"
            color="primary"
          />
        </Grid>
      </Box>
    </>
  );
};

export default Loading;
