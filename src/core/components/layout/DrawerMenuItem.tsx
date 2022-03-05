/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type DrawerMenuItemProps = {
  label: string;
  active?: boolean;
};

const DrawerMenuItem: React.FC<DrawerMenuItemProps> = (props) => {
  const { label, active = false } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        cursor: 'pointer',
        py: '4px',
        px: '8px',
        textDecoration: 'none',
        borderRight: active ? '5px solid green' : '',
        mt: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: active ? '16px' : '14px',
          fontWeight: active ? 900 : 600,
          pl: '12px',
          color: active ? '#1c65c4' : '#413c3c',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default DrawerMenuItem;
