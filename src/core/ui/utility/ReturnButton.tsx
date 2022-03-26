import { KeyboardArrowLeft } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

type ReturnButtonProps = {
  to: string;
};

const ReturnButton = ({ to }: ReturnButtonProps) => {
  return (
    <>
      <IconButton
        aria-label="return back"
        component={Link}
        to={to}
        replace={true}
      >
        <KeyboardArrowLeft fontSize="large" sx={{ height: '100%' }} />
      </IconButton>
    </>
  );
};

export default ReturnButton;
