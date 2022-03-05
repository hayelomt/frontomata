import { Email, Inbox } from '@mui/icons-material';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  return (
    <>
      <div>
        <Toolbar variant="dense" />
        <Divider />
        <List sx={{ p: 1 }}>
          <Typography variant="subtitle1" fontSize="12px" fontWeight="bold">
            COLLECTION TYPES
          </Typography>
          <SidebarLink to="/" label="Home" active icon={<Email />} />
          <SidebarLink to="/" label="Projects" />
          <SidebarLink to="/" label="Links" />
          <SidebarLink to="/" label="Blogs" />
          <SidebarLink to="/" label="Orders" />
        </List>
      </div>
    </>
  );
};

export default Sidebar;
