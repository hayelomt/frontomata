import { Grid } from '@mui/material';
import ProfileContainer from '../containers/ProfileContainer';

const ProfilePage = () => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ my: 1 }}
      >
        <Grid item>
          <ProfileContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
