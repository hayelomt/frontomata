import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

type LinkProps = {
  to: string;
  label: string;
};

const LinkButton = ({ to, label }: LinkProps) => {
  return (
    <>
      <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>
        <Link to={to}>
          <Typography sx={{ color: 'white' }} variant="subtitle2">
            {label}
          </Typography>
        </Link>
      </Button>
    </>
  );
};

export default LinkButton;
