import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import authService from '../../features/auth/service/authService';
import constants from '../utils/constants';
import { logError } from '../utils/logger';
import {
  ErrorHandler,
  SuccessHandler,
  ValidationError,
  ValidationHandler,
} from '../utils/types';

export type SendDataMethod = 'post' | 'patch' | 'put' | 'delete';

type CallApiArg = {
  endpoint: string;
  data: any;
  method?: SendDataMethod;
  headers?: Record<string, any>;
  onValidationError?: ValidationHandler;
  onError?: ErrorHandler;
  onSuccess?: SuccessHandler;
};

export const useSendApiData = () => {
  const [loading, setLoading] = useState(false);

  const callApi = async ({
    endpoint,
    data,
    method = 'post',
    headers = {},
    onValidationError,
    onError,
    onSuccess,
  }: CallApiArg) => {
    setLoading(true);
    try {
      const response = await axios[method](
        `${constants.apiUrl}/${endpoint}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${authService.getToken()}`,
            ...headers,
          },
        }
      );
      onSuccess?.call(this, response.data, response.status);
    } catch (err) {
      const apiErr = err as AxiosError;

      if (
        apiErr.response &&
        apiErr.response?.status === 400 &&
        onValidationError
      ) {
        onValidationError!(apiErr.response!.data as unknown as ValidationError);
      } else {
        onError?.call(
          this,
          apiErr.response?.data?.message ||
            apiErr.message ||
            'Unknown Error occurred'
        );
      }
      logError('Api Error', apiErr);
      logError('Res Data', apiErr.response?.data);
    }
    setLoading(false);
  };

  return { callApi, loading };
};
