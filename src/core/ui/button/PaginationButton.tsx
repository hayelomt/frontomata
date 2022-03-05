import React from 'react';
import { Button, Typography } from '@mui/material';

type PaginationButtonProps = {
  page: number;
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  page,
  active = false,
  onClick,
}) => {
  return (
    <>
      <Button
        size="small"
        variant="text"
        sx={{
          minWidth: '32px',
          height: '26px',
          ...(active
            ? {
                borderBottomStyle: 'solid',
                borderBottomWidth: '2px',
                borderRadius: '0',
              }
            : {}),
        }}
        onClick={onClick}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
          }}
        >
          {page}
        </Typography>
      </Button>
    </>
  );
};

export default PaginationButton;
