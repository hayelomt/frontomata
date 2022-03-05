import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { useState } from 'react';
import authService from '../../features/auth/service/authService';
import constants from '../utils/constants';
import { ErrorHandler, SuccessHandler } from '../utils/types';

type CallApiArg = {
  headers?: AxiosRequestHeaders;
  onError?: ErrorHandler;
  onSuccess?: SuccessHandler;
};

const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (
    endpoint: string,
    data: any,
    { headers, onError, onSuccess }: CallApiArg = {}
  ) => {
    setProgress(0);
    setUploading(true);
    try {
      const res = await axios.post(`${constants.apiUrl}/${endpoint}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${authService.getToken()}`,
          ...headers,
        },
        onUploadProgress: (progress) => {
          setProgress((progress.loaded * 100) / progress.total);
        },
      });

      onSuccess?.call(this, res.data, res.status);
    } catch (e) {
      const apiErr = e as AxiosError;
      console.log(apiErr);
      onError?.call(
        this,
        apiErr.response?.data?.message ||
          apiErr.message ||
          'Unknown Error occurred'
      );
    }
    setUploading(false);
  };

  return { uploadFile, uploading, progress };
};

export default useFileUpload;
