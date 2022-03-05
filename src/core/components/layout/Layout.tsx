import Header from './Header';
import Box from '@mui/material/Box';

type LayoutProps = {
  children: React.ReactChild;
};

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Header>{props.children}</Header>
    </Box>
  );
};

export default Layout;
