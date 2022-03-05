import { useState } from 'react';
import tableServices from '../tableServices';

const useDensity = (modelToken: string) => {
  const [dense, setDense] = useState(tableServices.getDensity(modelToken));

  const toggleDensity = () => {
    tableServices.saveDensity(modelToken, !dense);
    setDense(!dense);
  };

  return { dense, toggleDensity };
};

export default useDensity;
