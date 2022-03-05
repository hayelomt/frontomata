import { Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

type SidebarLinkProps = {
  to: string;
  label: string;
  active?: boolean;
  icon?: React.ReactElement;
};

const SidebarLink = ({ to, label, active = false, icon }: SidebarLinkProps) => {
  if (!icon) icon = <LinkIcon />;

  return (
    <>
      <ListItem
        dense
        component={Link}
        to={to}
        selected={active}
        color="prim"
        sx={{
          pl: 0,
          border: '1px solid',
          borderColor: active ? 'grey.300' : 'transparent',
          color: active ? 'primary.main' : '',
          transition: 'all 0.1s ease-in',
          '&:hover': !active
            ? {
                bgcolor: '#EDF4FC',
                color: 'primary.main',
                ml: '5px',
              }
            : {},
        }}
      >
        <Box
          sx={{
            width: '5px',
            height: '18px',
            bgcolor: active ? 'primary.main' : 'transparent',
            color: 'transparent',
            mr: 2,
            borderRadius: '20%',
          }}
        >
          x
        </Box>
        {icon && <ListItemIcon sx={{ minWidth: '35px' }}>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </ListItem>
    </>
  );
};

export default SidebarLink;
