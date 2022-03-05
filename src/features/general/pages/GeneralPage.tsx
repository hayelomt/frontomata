import { Grid, Typography } from '@mui/material';
import LinkButton from '../../../core/ui/button/LinkButton';
import GeneralsContainer from '../containers/GeneralsContainer';

const GeneralPage = () => {
  return (
    <>
      <Grid container justifyContent="space-between" sx={{ my: 1 }}>
        <Grid item>
          <Typography variant="h5">Generals</Typography>
        </Grid>
        <Grid item>
          <LinkButton to="/generals/create" label="+Add General" />
        </Grid>
      </Grid>
      <GeneralsContainer />
    </>
  );
};

export default GeneralPage;
