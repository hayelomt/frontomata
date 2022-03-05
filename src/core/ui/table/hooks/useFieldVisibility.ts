import { useState } from 'react';
import tableServices from '../tableServices';
import { TableHeader } from '../tableTypes';

const useFieldVisibility = (
  modelToken: string,
  tableHeaders: TableHeader[]
) => {
  const [fieldVisible, setFieldVisible] = useState(
    tableServices.getVisibleFields(modelToken, tableHeaders)
  );

  const handleToggleFieldVisibility = (field: string) => {
    const updatedVisibility = {
      ...fieldVisible,
      [field]: !fieldVisible[field],
    };

    // Save to storage
    tableServices.saveFieldVisibility(modelToken, updatedVisibility);
    setFieldVisible(updatedVisibility);
  };

  return { fieldVisible, handleToggleFieldVisibility };
};

export default useFieldVisibility;
