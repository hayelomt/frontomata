import { FormikHelpers, useFormik } from 'formik';
import { Renderer } from '../../../core/utils/types';
import Placeholder from '../../../core/utils/ui/placeholder';
import { Grid, TextField, Paper, Box, Button } from '@mui/material';
import { GeneralInputType } from '../general';

type GeneralProps = {
  initialValues: GeneralInputType;
  onSubmit: (
    value: GeneralInputType,
    helpers: FormikHelpers<GeneralInputType>
  ) => Promise<boolean>;
  submitting: boolean;
  creating?: boolean;
  renderAction?: Renderer;
};

const GeneralForm = ({
  initialValues,
  onSubmit,
  submitting,
  creating = false,
  renderAction = Placeholder,
}: GeneralProps) => {
  const handleSubmit = async (
    value: GeneralInputType,
    helpers: FormikHelpers<GeneralInputType>
  ) => {
    const success = await onSubmit(value, helpers);
    if (creating && success) formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  // console.log('Edit Form', initialValues);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={9}>
              <Paper sx={{ p: 2, pb: 3 }}>
                <Grid
                  container
                  justifyContent="space-between"
                  spacing={1}
                  sx={{ mt: 2 }}
                >
                  <Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
                    <TextField
                      fullWidth
                      name="title"
                      type="text"
                      variant="standard"
                      label="Title"
                      placeholder="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={Boolean(formik.errors.title)}
                      helperText={formik.errors.title}
                    />
                  </Grid>

                  <Grid item sx={{ flexGrow: 2 }}></Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Paper sx={{ p: 2 }}>
                <Grid container>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting}
                    size="small"
                  >
                    {submitting ? 'Saving' : 'Save'}
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default GeneralForm;
