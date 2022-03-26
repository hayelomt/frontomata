import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type SummaryBlockProps = {
  buttonLabel: string;
  modelLabel: string;
  itemCount: number;
  addRoute: string;
  showCreate: boolean;
};

const SummaryBlock = ({
  modelLabel,
  buttonLabel,
  itemCount,
  addRoute,
  showCreate,
}: SummaryBlockProps) => {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Grid container flexDirection="column">
            <Grid item>
              <Typography variant="h5">{modelLabel}</Typography>
            </Grid>
            <Grid item>
              <Typography fontSize="13px">{itemCount} entries found</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {showCreate && (
            <Button
              variant="contained"
              component={Link}
              to={addRoute}
              sx={{ height: '30px' }}
            >
              {buttonLabel}
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SummaryBlock;
