import { Box } from "@mui/material";
import { useState } from "react";
import useFetchApiData from "../../../core/hooks/useFetchApiData";
import Layout from "../../../core/ui/layout/Layout";
import TableContainer from "../../../core/ui/table/TableContainer";
import { TableHeader } from "../../../core/ui/table/tableTypes";
import { Model, Paginated } from "../../../core/utils/types";
import { Blog } from "../blog";

const tableHeaders: TableHeader[] = [
  { field: 'title', label: 'Some Title', align: 'right' },
  { field: 'counter', label: 'counter', align: 'left' },
  { field: 'description', label: 'description', align: 'left' },
  { field: 'selection', label: 'selection', align: 'left' },
  { field: 'color', label: 'color', align: 'left' },
  { field: 'tune_level', label: 'tune_level', align: 'left' },
];
const BlogList = () => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const { fetchData } = useFetchApiData();

  const handleFetchData = async (query: any, cb: (c: number) => void) => {
    await fetchData('blogs', {
      onSuccess: ({ total, data: apiData }: Paginated<Blog>) => {
        setData(apiData);
        cb(total);
      },
    });
  };

  const handleDelete = async (model: Model) => {
    // TODO: Handle
  };

  return (
    <>
      <Layout>
        <Box sx={{ p: 2 }}>
          <TableContainer
            modelToken="blog"
            tableHeaders={tableHeaders}
            data={data}
            modelLabel="Blogs"
            addRoute="blogs/create"
            editRoutePrefix="blogs/edit"
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

export default BlogList;
