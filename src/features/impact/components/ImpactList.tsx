import { Box } from "@mui/material";
import { useState } from "react";
import useFetchApiData from "../../../core/hooks/useFetchApiData";
import Layout from "../../../core/ui/layout/Layout";
import TableContainer from "../../../core/ui/table/TableContainer";
import { TableHeader } from "../../../core/ui/table/tableTypes";
import { Paginated } from "../../../core/utils/types";
import { parseQuery } from "../../../core/utils/utility";
import { Impact } from "../impact";
import { useSendApiData } from "../../../core/hooks/useSendApiData";
import { toastError, toastMessage } from "../../../core/utils/ui/alert";

const tableHeaders: TableHeader[] = [
  { field: 'amount', label: 'amount', align: 'left' },
  { field: 'from_date', label: 'from_date', align: 'left' },
  { field: 'to_date', label: 'to_date', align: 'left' },
  { field: 'women_impacted', label: 'women_impacted', align: 'left' },
  { field: 'girls_impacted', label: 'girls_impacted', align: 'left' },
  { field: 'men_impacted', label: 'men_impacted', align: 'left' },
  { field: 'boys_impacted', label: 'boys_impacted', align: 'left' },
  { field: 'donated_by', label: 'donated_by', align: 'left' },
  { field: 'locations', label: 'locations', align: 'left' },
];
const ImpactList = () => {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const { fetchData } = useFetchApiData();
  const { callApi } = useSendApiData();

  const handleFetchData = async (query: any, cb: (c: number) => void) => {

    await fetchData(`impacts${parseQuery(query)}`, {
      onSuccess: ({ total, data: apiData }: Paginated<Impact>) => {
        setData(apiData);
        cb(total);
      },
    });
  };

  const handleDelete = async (id: number | string, showMessage = true) => {
    let success = false;

    await callApi({
      endpoint: `auth-ea35a/impacts/${id}`,
      data: {},
      method: 'delete',
      onSuccess: async () => {
        if (showMessage) toastMessage('Project Removed');
        success = true;
      },
      onError: () => {
        if (showMessage) toastError('Something went wrong while deleting. Try again');
      },
    });

    return success;
  };
  
  return (
    <>
      <Layout>
        <Box sx={{ p: 2 }}>
          <TableContainer
            modelToken="impact"
            tableHeaders={tableHeaders}
            data={data}
            modelLabel="Impacts"
            addRoute="/impacts/create"
            editRoutePrefix="/impacts/edit"
            actions={{
              onFetchData: handleFetchData,
              onDelete: handleDelete,
            }}
            settings={{
              canCreate: true,
              canEdit: true,
              canDelete: true,
            }}
          />
        </Box>
      </Layout>
    </>
  );
};

export default ImpactList;
