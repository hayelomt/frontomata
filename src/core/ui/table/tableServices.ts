import constants from '../../utils/constants';
import storage from '../../utils/storage';
import { SortOp, TableHeader } from './tableTypes';

type SortSave = {
  sortField: string;
  sortOp: SortOp;
};

const tableServices = {
  saveFieldVisibility: (
    modelToken: string,
    visibility: Record<string, boolean>
  ) => {
    storage.saveItem(
      `${constants.prefixes.visibility}_${modelToken}`,
      visibility
    );
  },

  getVisibleFields: (
    modelToken: string,
    tableHeaders: TableHeader[]
  ): Record<string, boolean> => {
    const defaultFields: Record<string, boolean> = {};
    tableHeaders.forEach((header) => {
      defaultFields[header.field] = true;
    });

    const saved = storage.getItem<Record<string, boolean>>(
      `${constants.prefixes.visibility}_${modelToken}`
    );

    return saved || defaultFields;
  },

  saveSorting: (modelToken: string, sortField: string, sortOp: SortOp) => {
    storage.saveItem(`${constants.prefixes.sorting}_${modelToken}`, {
      sortField,
      sortOp,
    });
  },

  getSorting: (modelToken: string) => {
    const defaultSort: SortSave = { sortField: '', sortOp: 'asc' };

    const saved = storage.getItem<SortSave>(
      `${constants.prefixes.sorting}_${modelToken}`
    );

    return saved || defaultSort;
  },

  saveDensity: (modelToken: string, dense: boolean) => {
    storage.saveItem(`${constants.prefixes.density}_${modelToken}`, dense);
  },

  getDensity: (modelToken: string): boolean => {
    return (
      storage.getItem(`${constants.prefixes.density}_${modelToken}`) || false
    );
  },
};

export default tableServices;
