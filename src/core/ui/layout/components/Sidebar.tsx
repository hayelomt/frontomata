import { Home } from '@mui/icons-material';
import { Divider, List, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <Toolbar variant="dense" />
        <Divider />
        <List sx={{ p: 1 }}>
          <Typography variant="subtitle1" fontSize="12px" fontWeight="bold">
            COLLECTION TYPES
          </Typography>
          <SidebarLink
            to="/"
            label="Home"
            active={location.pathname === '/'}
            icon={<Home />}
          />
        </List>
      </div>
    </>
  );
};

export default Sidebar;
