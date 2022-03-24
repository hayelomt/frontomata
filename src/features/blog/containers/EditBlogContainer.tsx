import { Grid, Typography } from "@mui/material";
import { FormikHelpers } from "formik";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../../../core/ui/layout/Layout";
import { useSendApiData } from "../../../core/hooks/useSendApiData";
import { toastError, toastMessage } from "../../../core/utils/ui/alert";
import { parseValidationErrors } from "../../../core/utils/validation";
import useFetchApiData from "../../../core/hooks/useFetchApiData";
import Loading from "../../../core/ui/utility/Loading";
import { BlogEdit, Blog } from "../blog";
import EditBlogForm from "../components/EditBlogForm";

const EditBlogContainer = () => {
  const { id } = useParams();
  const { callApi, loading: submitting } = useSendApiData();
  const { fetchData, loading } = useFetchApiData();
  const [blog, setBlog] = useState<Blog | null>(null);

  const fetchBlog = () =>
    fetchData(`/blogs/${id}`, {
      onSuccess: (data: Blog) => {
        setBlog(data);
      },
    });

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (
    values: BlogEdit,
    { setFieldError }: FormikHelpers<BlogEdit>
  ) => {
    let success = false;

    const formData: any = new FormData();
    const dateFields: string[] = ["created_at"]
    Object.entries(values).forEach(([key, val]) => {
      if (dateFields.includes(key)) {
        formData.append(key, (val as Date).toISOString().substring(0, 10));
      } else {
        formData.append(key, val as Blob);
      }
    });

    await callApi({
      endpoint: `/blogs/${id}?_method=PATCH`,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (_) => {
        await fetchBlog;
        toastMessage('Blog Edited');
        success = true;
      },
    });

    return success;
  };

  if (loading || !blog) return <Loading />;

  return (
    <Layout>
      <>
        <Grid sx={{ p: 2 }}>  
          <Grid container sx={{ mb: 1, px: 1 }}>
            <Typography variant="h5">Add Blog</Typography>
          </Grid>
          <EditBlogForm blog={blog!} onSubmit={handleSubmit} submitting={submitting} />
        </Grid>
      </>
    </Layout>
  );
};

export default EditBlogContainer;
