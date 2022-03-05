import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../../../core/ui/utility/Loading';
import useFetchApiData from '../../../core/hooks/useFetchApiData';
import useFileUpload from '../../../core/hooks/useFileUpload';
import { useSendApiData } from '../../../core/hooks/useSendApiData';
import { toastError, toastMessage } from '../../../core/utils/ui/alert';
import { parseValidationErrors } from '../../../core/utils/validation';
import GeneralForm from '../components/GeneralForm';
import { General, GeneralInputType } from '../general';
import FileActions from '../../../core/containers/FileUploader';
import { Grid } from '@mui/material';
import { Media } from '../../../core/utils/types';
import FileListItem from '../../../core/ui/utility/FileListItem';

const EditGeneralContainer = () => {
  const { id } = useParams();
  const { fetchData, loading } = useFetchApiData();
  const { callApi, loading: dataSending } = useSendApiData();
  const { uploadFile, uploading, progress } = useFileUpload();
  const { callApi: callDeleteApi } = useSendApiData();
  const [general, setGeneral] = useState<General | null>(null);
  const [initialValues, setInitialValues] = useState<GeneralInputType>({
    title: '',
  });

  const fetchGeneral = () =>
    fetchData(`generals/${id}`, {
      onSuccess: (data: General) => {
        setGeneral(data);
        setInitialValues({
          title: data.title,
        });
      },
    });

  useEffect(() => {
    fetchGeneral();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (
    values: GeneralInputType,
    { setFieldError }: FormikHelpers<GeneralInputType>
  ) => {
    let success = false;
    await callApi({
      endpoint: `generals/${general!.id}`,
      data: values,
      method: 'patch',
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (_) => {
        await fetchGeneral();
        toastMessage('General updated');
        success = true;
      },
    });

    return success;
  };

  const handleUpload = async (file: File): Promise<boolean> => {
    const formData = new FormData();
    formData.append('file', file!);

    let uploaded = false;

    await uploadFile(`generals/${general!.id}/upload-file`, formData, {
      onSuccess: () => {
        toastMessage('File Uploaded');
        uploaded = true;
        setTimeout(() => fetchGeneral(), 100);
      },
      onError: (err) => {
        toastError(err);
      },
    });

    return uploaded;
  };

  const handleFileDelete = async (media: Media) => {
    await callDeleteApi({
      endpoint: `generals/${general!.id}/delete-file/${media.id}`,
      data: {},
      method: 'delete',
      onSuccess: async () => {
        toastMessage('File Removed');
        // TODO: Fix Unmount component issue
        setTimeout(() => fetchGeneral(), 100);
      },
      onError: () => {
        toastError('Something went wrong while deleting. Try again');
      },
    });
  };

  const ActionComponent = () => {
    return (
      <>
        <FileActions
          onSubmit={handleUpload}
          uploading={uploading}
          progress={progress}
        />

        <Grid container sx={{ mt: 1 }}>
          {general &&
            general.media.map((m) => (
              <FileListItem
                media={m}
                key={m.id}
                onDelete={() => handleFileDelete(m)}
              />
            ))}
        </Grid>
      </>
    );
  };

  if (loading || !general) return <Loading />;

  return (
    <>
      <GeneralForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitting={dataSending}
        renderAction={ActionComponent}
      />
    </>
  );
};

export default EditGeneralContainer;
