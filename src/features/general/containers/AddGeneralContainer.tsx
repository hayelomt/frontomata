import { Grid, Typography } from '@mui/material';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendApiData } from '../../../core/hooks/useSendApiData';
import { toastError, toastMessage } from '../../../core/utils/ui/alert';
import { parseValidationErrors } from '../../../core/utils/validation';
import EditGeneralForm from '../components/GeneralForm';
import { GeneralInputType } from '../general';

const emptyValue: GeneralInputType = {
  title: '',
};

const AddGeneralContainer = () => {
  const navigate = useNavigate();
  const { callApi, loading: submitting } = useSendApiData();
  const [initialValues, setInitialValues] =
    useState<GeneralInputType>(emptyValue);

  const handleSubmit = async (
    values: GeneralInputType,
    { setFieldError }: FormikHelpers<GeneralInputType>
  ) => {
    let success = false;
    await callApi({
      endpoint: `generals`,
      data: values,
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (_) => {
        toastMessage('General Created');
        setInitialValues(emptyValue);
        success = true;
        navigate('/generals', { replace: true });
      },
    });

    return success;
  };

  return (
    <>
      <Grid container sx={{ mb: 1, px: 1 }}>
        <Typography variant="h5">Add General</Typography>
      </Grid>
      <EditGeneralForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitting={submitting}
        creating={true}
      />
    </>
  );
};

export default AddGeneralContainer;
