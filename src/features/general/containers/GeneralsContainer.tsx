import { useState, useEffect } from 'react';
import useTablePagination from '../../../core/ui/table/hooks/useTablePagination';
import DeleteAction from '../../../core/ui/utility/DeleteAction';
import Loading from '../../../core/ui/utility/Loading';
import useFetchApiData from '../../../core/hooks/useFetchApiData';
import { useSendApiData } from '../../../core/hooks/useSendApiData';
import { toastError, toastMessage } from '../../../core/utils/ui/alert';
import GeneralsTable from '../components/GeneralsTable';
import { General } from '../general';

const GeneralsContainer = () => {
  const {
    data: { page, rowsPerPage, total },
    handlers: { handleChangePage, handleChangeRowsPerPage, setTotal },
  } = useTablePagination();
  const [generals, setGenerals] = useState<General[]>([]);
  const { fetchData, loading } = useFetchApiData();
  const { callApi } = useSendApiData();

  const fetchGenerals = () =>
    fetchData(`generals?page=${page + 1}&limit=${rowsPerPage}`, {
      onSuccess: (response) => {
        const { data, total } = response;
        setTotal(total);
        setGenerals(data);
      },
    });
  useEffect(() => {
    fetchGenerals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleDeletion = async (curGeneral: General) => {
    await callApi({
      endpoint: `generals/${curGeneral.id}`,
      data: {},
      method: 'delete',
      onSuccess: async () => {
        toastMessage('General Removed');
        // TODO: Fix Unmount component issue
        setTimeout(() => fetchGenerals(), 100);
      },
      onError: () => {
        toastError('Something went wrong while deleting. Try again');
      },
    });
  };
  // console.log('load', loading);

  if (loading) return <Loading />;

  return (
    <>
      <GeneralsTable
        data={generals}
        pagination={{
          page,
          rowsPerPage,
          total,
          handleChangePage,
          handleChangeRowsPerPage,
        }}
        renderDelete={(delGeneral) => (
          <DeleteAction
            message="Are you sure you want to delete general?"
            onDelete={() => handleDeletion(delGeneral)}
          />
        )}
      />
    </>
  );
};

export default GeneralsContainer;
