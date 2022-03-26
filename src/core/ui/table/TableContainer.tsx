import useTablePagination from './hooks/useTablePagination';
import GenericTable from './components/GenericTable';
import { TableHeader } from './tableTypes';
import DeleteAction from '../utility/DeleteAction';
import GenericTableFooter from './components/GenericTableFooter';
import FilterBlock from './components/filters/FilterBlock';
import useSorting from './hooks/useSorting';
import useFieldVisibility from './hooks/useFieldVisibility';
import useChecklist from './hooks/useChecklist';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Model } from '../../../core/utils/types';
import { Edit } from '@mui/icons-material';
import SummaryBlock from './components/SummaryBlock';
import { Grid } from '@mui/material';
import useDensity from './hooks/useDensity';

type TableActions = {
  onFetchData: (query: any, cb: (c: number) => void) => Promise<void>;
  onDelete: (id: number | string, showMessage?: boolean) => Promise<boolean>;
};

type TableContainerProps = {
  modelToken: string;
  data: Record<string, any>[];
  tableHeaders: TableHeader[];
  editRoutePrefix: string;
  addRoute: string;
  modelLabel: string;
  actions: TableActions;
  settings?: {
    canEdit: boolean;
    canDelete: boolean;
    canCreate: boolean;
  };
};

const TableContainer = ({
  modelToken,
  tableHeaders,
  data,
  editRoutePrefix,
  addRoute,
  modelLabel,
  actions: { onFetchData, onDelete },
  settings = {
    canEdit: true,
    canDelete: true,
    canCreate: true,
  },
}: TableContainerProps) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Record<string, any>>({});
  const { dense, toggleDensity } = useDensity(modelToken);
  const {
    data: { page, rowsPerPage, total },
    handlers: { handleChangePage, handleChangeRowsPerPage, setTotal },
  } = useTablePagination(modelToken);
  const { sortField, sortOp, handleSort } = useSorting(modelToken);
  const { fieldVisible, handleToggleFieldVisibility } = useFieldVisibility(
    modelToken,
    tableHeaders
  );
  const { checklist, toggleChecklist, resetChecklist } = useChecklist(data);

  const fetchData = async () => {
    await onFetchData(
      {
        page: page + 1,
        rowsPerPage,
        sortField,
        sortOp,
        filter,
      },
      (t) => {
        setTotal(t);
      }
    );

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortField, sortOp, filter]);

  const filteredHeaders = tableHeaders.filter(
    (header) => fieldVisible[header.field]
  );

  const handleDelete = async (item: Model) => {
    if (await onDelete(item.id)) {
      await fetchData();
    }
  };

  const handleMultiDelete = async () => {
    let success = false;
    const promises: any[] = [];

    console.log(Object.keys(checklist));

    Object.keys(checklist).forEach((key) => {
      // promises.push(
      //   onDelete(key, false).then((deleted) => {
      //     success = success || deleted;
      //   })
      // );
    });

    await Promise.all(promises);

    resetChecklist();

    if (success) await fetchData();
  };

  return (
    <>
      <GenericTable
        data={data}
        tableHeaders={filteredHeaders}
        checklist={checklist}
        toggleChecklist={toggleChecklist}
        size={dense ? 'small' : 'medium'}
        onMultiDelete={handleMultiDelete}
        sorting={{
          orderBy: sortField,
          orderOp: sortOp,
          onSort: handleSort,
        }}
        loading={loading}
        renderSummary={() => (
          <SummaryBlock
            modelLabel={modelLabel}
            addRoute={addRoute}
            buttonLabel={`+ New ${modelLabel}`}
            itemCount={total}
            showCreate={settings.canCreate}
          />
        )}
        renderFilterBlock={() => (
          <FilterBlock
            modelName={modelLabel}
            tableHeaders={tableHeaders}
            fieldVisible={fieldVisible}
            toggleFieldVisibility={handleToggleFieldVisibility}
            tableDense={dense}
            toggleTableDensity={toggleDensity}
            onFilterApply={(filter) => {
              setFilter(filter);
              console.log('apply filter');
            }}
          />
        )}
        renderFooter={() => (
          <GenericTableFooter
            pagination={{
              page,
              rowsPerPage,
              total,
              handleChangePage,
              handleChangeRowsPerPage,
            }}
          />
        )}
        renderActions={(item: Model) => (
          <>
            <Grid container justifyContent="flex-end" alignItems="flex-end">
              {settings.canEdit && (
                <Link to={`${editRoutePrefix}/${item.id}`}>
                  <Edit fontSize="small" sx={{ mr: 1, fontSize: '15px' }} />
                </Link>
              )}
              {settings.canDelete && (
                <DeleteAction
                  message="Are you sure you want to remove entry?"
                  onDelete={async (e) => {
                    handleDelete(item);
                  }}
                />
              )}
            </Grid>
          </>
        )}
      />
    </>
  );
};

export default TableContainer;
