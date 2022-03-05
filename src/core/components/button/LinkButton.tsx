import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

type LinkProps = {
  to: string;
  label: string;
};

const LinkButton = ({ to, label }: LinkProps) => {
  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{ textTransform: 'none' }}
        component={Link}
        to={to}
      >
        {label}
      </Button>
    </>
  );
};

export default LinkButton;
