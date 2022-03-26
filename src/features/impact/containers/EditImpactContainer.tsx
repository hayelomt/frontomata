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
import { ImpactEdit, Impact } from "../impact";
import EditImpactForm from "../components/EditImpactForm";
import ReturnButton from "../../../core/ui/utility/ReturnButton";

const EditImpactContainer = () => {
  const { id } = useParams();
  const { callApi, loading: submitting } = useSendApiData();
  const { fetchData, loading } = useFetchApiData();
  const [impact, setImpact] = useState<Impact | null>(null);

  const fetchImpact = () =>
    fetchData(`impacts/${id}`, {
      onSuccess: (data: Impact) => {
        setImpact(data);
      },
    });

  useEffect(() => {
    fetchImpact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (
    values: ImpactEdit,
    { setFieldError }: FormikHelpers<ImpactEdit>
  ) => {
    let success = false;

    const formData: any = { ...values };
    const dateFields: string[] = ["from_date","to_date"];
    dateFields.forEach((field) => {
      if (formData[field]) {
        formData[field] = formData[field].toISOString()
        .substring(0, 10) as unknown as Date;
      }
    });

    await callApi({
      endpoint: `auth-ea35a/impacts/${id}`,
      method: 'patch',
      data: formData,
      headers: {
        'Content-Type': 'application/json'
      },
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (_) => {
        await fetchImpact;
        toastMessage('Impact Edited');
        success = true;
      },
    });

    return success;
  };

  if (loading || !impact) return <Loading />;

  return (
    <Layout renderLeftToolbar={() => <ReturnButton to="/impacts" />}>
      <Grid sx={{ p: 2 }}>  
        <Grid container sx={{ mb: 1, px: 1 }}>
          <Typography variant="h5">Edit Impact</Typography>
        </Grid>
        <EditImpactForm impact={impact!} onSubmit={handleSubmit} submitting={submitting} />
      </Grid>
    </Layout>
  );
};

export default EditImpactContainer;
