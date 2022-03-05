import { Box } from '@mui/material';
import Layout from '../core/ui/layout/Layout';
import TableContainer from '../core/ui/table/TableContainer';
import { TableHeader } from '../core/ui/table/tableTypes';
import { Model } from '../core/utils/types';

function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
];

const tableHeaders: TableHeader[] = [
  { field: 'id', label: 'Id', align: 'left' },
  { field: 'name', label: 'Dessert (100g serving)' },
  { field: 'calories', label: 'Calories', align: 'right' },
  { field: 'fat', label: 'Fat', align: 'right' },
  { field: 'carbs', label: 'Carbs', align: 'right' },
  { field: 'protein', label: 'Protein', align: 'right' },
];

const Home = () => {
  const handleFetchData = async (cb: (c: number) => void) => {
    console.log('Fetch data');
    cb(10);
  };

  const handleDelete = async (model: Model) => {
    //
  };

  return (
    <>
      <Layout renderLeftToolbar={() => <div>Hello</div>}>
        <Box sx={{ p: 2 }}>
          <TableContainer
            modelToken="home"
            tableHeaders={tableHeaders}
            data={rows}
            modelLabel="Homes"
            addRoute="/generals/create"
            editRoutePrefix="/generals/edit"
            actions={{
              onFetchData: handleFetchData,
              onDelete: handleDelete,
            }}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Home;
