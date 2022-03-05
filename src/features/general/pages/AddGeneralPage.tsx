import { Box } from '@mui/material';
import Layout from '../../../core/ui/layout/Layout';
import AddGeneralContainer from '../containers/AddGeneralContainer';

const AddGeneralPage = () => {
  return (
    <>
      <Layout>
        <Box sx={{ p: 2 }}>
          <AddGeneralContainer />
        </Box>
      </Layout>
    </>
  );
};

export default AddGeneralPage;
