import { Grid, Typography } from "@mui/material";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useSendApiData } from "../../../core/hooks/useSendApiData";
import { toastError, toastMessage } from "../../../core/utils/ui/alert";
import { parseValidationErrors } from "../../../core/utils/validation";
import { BlogCreate } from "../blog";
import CreateBlogForm from "../components/CreateBlogForm";

const CreateBlogContainer = () => {
  const navigate = useNavigate();
  const { callApi, loading: submitting } = useSendApiData();

  const handleSubmit = async (
    values: BlogCreate,
    { setFieldError }: FormikHelpers<BlogCreate>
  ) => {
    let success = false;

    const formData = new FormData();
    const dateFields: string[] = ["created_at"]
    Object.entries(values).forEach(([key, val]) => {
      if (dateFields.includes(key)) {
        formData.append(key, (val as Date).toISOString().substring(0, 10));
      } else {
        formData.append(key, val as Blob);
      }
    });

    await callApi({
      endpoint: '/blogs',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (_) => {
        toastMessage('Blog Created');
        success = true;
      },
    });

    if (success) navigate('/testimonies', { replace: true });

    return success;
  };

  return (
    <>
      <Grid container sx={{ mb: 1, px: 1 }}>
        <Typography variant="h5">Add Blog</Typography>
      </Grid>
      <CreateBlogForm onSubmit={handleSubmit} submitting={submitting} />
    </>
  );
};

export default CreateBlogContainer;
