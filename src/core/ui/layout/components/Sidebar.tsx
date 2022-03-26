import { Home } from '@mui/icons-material';
import { Divider, Grid, List, Toolbar, Typography } from '@mui/material';
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
          <Grid
            container
            flexDirection="column"
            justifyContent="space-between"
            sx={{}}
          >
            <Grid item>
              <Typography variant="subtitle1" fontSize="12px" fontWeight="bold">
                COLLECTION TYPES
              </Typography>
              <SidebarLink
                to="/"
                label="Home"
                active={location.pathname === '/'}
                icon={<Home />}
              />
              <SidebarLink
                to="/impacts"
                label="Impact"
                active={location.pathname.startsWith('/impacts')}
              />
            </Grid>

            {/* <Grid item>
              <Typography
                variant="subtitle1"
                fontSize="12px"
                fontWeight="bold"
                sx={{ mt: 2 }}
              >
                SINGLE TYPES
              </Typography>
            </Grid> */}
          </Grid>
        </List>
      </div>
    </>
  );
};

export default Sidebar;
