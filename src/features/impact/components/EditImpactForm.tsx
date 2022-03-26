
import { FormikHelpers, useFormik } from "formik";
import { ImpactEdit, Impact } from "../impact";
import { Grid, FormHelperText, TextField, Paper, Box, Button } from "@mui/material";
import ReactQuill from "react-quill";
import { richTextModules } from "../../../core/utils/utility";
import DatePicker from "react-datepicker";


type ImpactProps = {
  onSubmit: (
    value: ImpactEdit,
    helpers: FormikHelpers<ImpactEdit>
  ) => Promise<boolean>;
  submitting: boolean;
  impact: Impact;
};

const EditImpactForm = ({
  onSubmit,
  submitting,
  impact
}: ImpactProps) => {
  const handleSubmit = async (
    value: ImpactEdit,
    helpers: FormikHelpers<ImpactEdit>
  ) => {
    const success = await onSubmit(value, helpers);
    if (success) formik.resetForm();
  };

  const initialValues: ImpactEdit =  {
    title: impact.title,
    amount: impact.amount,
    from_date: new Date(impact.from_date),
    to_date: new Date(impact.to_date),
    women_impacted: impact.women_impacted,
    girls_impacted: impact.girls_impacted,
    men_impacted: impact.men_impacted,
    boys_impacted: impact.boys_impacted,
    donated_by: impact.donated_by,
    locations: impact.locations,

  }

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
  <Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <Grid item xs={12}>
    Title
  </Grid>
  <ReactQuill
    modules={richTextModules}
    value={formik.values.title}
    onChange={(e) => {
      formik.setFieldValue('title', e);
    }}
    placeholder="Title"
  />
  {formik.touched.title && formik.errors.title && (
    <FormHelperText error>
      {formik.errors.title}
    </FormHelperText>
  )}
</Grid>
</Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    name="amount"
    size="small"
    type="number"
    variant="outlined"
    label="Amount"
    placeholder="Amount"
    value={formik.values.amount}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.amount)}
    helperText={formik.errors.amount}
  />
</Grid>

<Grid item sx={{ flexGrow: 1 }} alignItems="flex-end">

  <Grid item>From Date</Grid>
  <Grid item alignItems="flex-end">
    <DatePicker
      selected={formik.values.from_date || new Date()}
      onChange={(e) => {
        formik.setFieldValue('from_date', e);
      }}
      dateFormat="yyyy/MM/dd"
    />
  </Grid>
  <Grid item xs={12}>
    {formik.touched.from_date && formik.errors.from_date && (
      <FormHelperText error>
        {formik.errors.from_date}
      </FormHelperText>
    )}
  </Grid>
</Grid>

<Grid item sx={{ flexGrow: 1 }} alignItems="flex-end">

  <Grid item>To Date</Grid>
  <Grid item alignItems="flex-end">
    <DatePicker
      selected={formik.values.to_date || new Date()}
      onChange={(e) => {
        formik.setFieldValue('to_date', e);
      }}
      dateFormat="yyyy/MM/dd"
    />
  </Grid>
  <Grid item xs={12}>
    {formik.touched.to_date && formik.errors.to_date && (
      <FormHelperText error>
        {formik.errors.to_date}
      </FormHelperText>
    )}
  </Grid>
</Grid>
</Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    name="women_impacted"
    size="small"
    type="number"
    variant="outlined"
    label="Women Impacted"
    placeholder="Women Impacted"
    value={formik.values.women_impacted}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.women_impacted)}
    helperText={formik.errors.women_impacted}
  />
</Grid>

<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    name="girls_impacted"
    size="small"
    type="number"
    variant="outlined"
    label="Girls Impacted"
    placeholder="Girls Impacted"
    value={formik.values.girls_impacted}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.girls_impacted)}
    helperText={formik.errors.girls_impacted}
  />
</Grid>

<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    name="men_impacted"
    size="small"
    type="number"
    variant="outlined"
    label="Men Impacted"
    placeholder="Men Impacted"
    value={formik.values.men_impacted}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.men_impacted)}
    helperText={formik.errors.men_impacted}
  />
</Grid>

<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    name="boys_impacted"
    size="small"
    type="number"
    variant="outlined"
    label="Boys Impacted"
    placeholder="Boys Impacted"
    value={formik.values.boys_impacted}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.boys_impacted)}
    helperText={formik.errors.boys_impacted}
  />
</Grid>
</Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 2 }}>
  <TextField
    fullWidth
    name="donated_by"
    size="small"
    type="text"
    variant="outlined"
    label="Donated By"
    placeholder="Donated By"
    value={formik.values.donated_by}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.donated_by)}
    helperText={formik.errors.donated_by}
  />
</Grid>

<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    name="locations"
    size="small"
    type="text"
    variant="outlined"
    label="Locations"
    placeholder="Locations"
    value={formik.values.locations}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.locations)}
    helperText={formik.errors.locations}
  />
</Grid>

<Grid item sx={{ flexGrow: 1 }}></Grid>
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

export default EditImpactForm;
