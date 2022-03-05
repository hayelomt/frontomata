import { useState } from 'react';
import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import constants from '../utils/constants';
import { ErrorHandler, SuccessHandler } from '../utils/types';

type CallApiArg = {
  headers?: AxiosRequestHeaders;
  onError?: ErrorHandler;
  onSuccess?: SuccessHandler;
};

const useFetchApiData = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    endpointUrl: string,
    { headers = {}, onSuccess, onError }: CallApiArg = {}
  ) => {
    setLoading(true);
    try {
      const res = await axios.get(`${constants.apiUrl}/${endpointUrl}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers,
        },
      });

      onSuccess?.call(this, res.data, res.status);
    } catch (e) {
      const apiErr = e as AxiosError;
      onError?.call(
        this,
        apiErr.response?.data?.message ||
          apiErr.message ||
          'Unknown Error occurred'
      );
    }
    setLoading(false);
  };

  return { fetchData, loading };
};

export default useFetchApiData;
