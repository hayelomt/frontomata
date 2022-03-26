import { Grid, Typography } from "@mui/material";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import Layout from "../../../core/ui/layout/Layout";
import { useSendApiData } from "../../../core/hooks/useSendApiData";
import { toastError, toastMessage } from "../../../core/utils/ui/alert";
import { parseValidationErrors } from "../../../core/utils/validation";
import { ImpactCreate } from "../impact";
import CreateImpactForm from "../components/CreateImpactForm";
import ReturnButton from "../../../core/ui/utility/ReturnButton";

const CreateImpactContainer = () => {
  const navigate = useNavigate();
  const { callApi, loading: submitting } = useSendApiData();
  

  const handleSubmit = async (
    values: ImpactCreate,
    { setFieldError }: FormikHelpers<ImpactCreate>
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
      endpoint: 'auth-ea35a/impacts',
      data: formData,
      headers: {
        'Content-Type': 'application/json'
      },
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (_) => {
        toastMessage('Impact Created');
        success = true;
      },
    });

    if (success) navigate('/testimonies', { replace: true });

    return success;
  };
  

  return (
    <Layout renderLeftToolbar={() => <ReturnButton to="/impacts" />}>
      <Grid sx={{ p: 2 }}>
        <Grid container sx={{ mb: 2, px: 1 }}>
          <Typography variant="h5">Add Impact</Typography>
        </Grid>
        <CreateImpactForm  onSubmit={handleSubmit} submitting={submitting} />
      </Grid>
    </Layout>
  );
};

export default CreateImpactContainer;
