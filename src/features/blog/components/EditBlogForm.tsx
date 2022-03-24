
import { FormikHelpers, useFormik } from "formik";
import { BlogEdit, Blog } from "../blog";
import { Grid, TextField, Box, FormControl, InputLabel, FormHelperText, Select, MenuItem, FormControlLabel, Radio, FormLabel, RadioGroup, Checkbox, Paper, Button } from "@mui/material";
import DatePicker from "react-datepicker";


type BlogProps = {
  onSubmit: (
    value: BlogEdit,
    helpers: FormikHelpers<BlogEdit>
  ) => Promise<boolean>;
  submitting: boolean;
  blog: Blog;
};

const EditBlogForm = ({
  onSubmit,
  submitting,
  blog
}: BlogProps) => {
  const handleSubmit = async (
    value: BlogEdit,
    helpers: FormikHelpers<BlogEdit>
  ) => {
    const success = await onSubmit(value, helpers);
    if (success) formik.resetForm();
  };

  const initialValues: BlogEdit =  {
    title: blog.title,
    counter: blog.counter,
    description: blog.description,
    image: null,
    selection: blog.selection,
    color: blog.color,
    tune_level: blog.tune_level,
    conditions: blog.conditions,
    created_at: new Date(blog.created_at),

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
  <TextField
    fullWidth
    name="title"
    size="small"
    type="text"
    variant="outlined"
    label="Title"
    placeholder="Title"
    value={formik.values.title}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.title)}
    helperText={formik.errors.title}
  />
</Grid>

<Grid item sx={{ flexGrow: 2 }}></Grid>

<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    name="counter"
    size="small"
    type="number"
    variant="outlined"
    label="Counter"
    placeholder="Counter"
    value={formik.values.counter}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.counter)}
    helperText={formik.errors.counter}
  />
</Grid>
</Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <TextField
    fullWidth
    name="description"
    size="small"
    type="text"
    variant="outlined"
    label="Description"
    placeholder="Description"
    value={formik.values.description}
    onChange={formik.handleChange}
    error={Boolean(formik.errors.description)}
    helperText={formik.errors.description}
    multiline
    rows={4}
  />
</Grid>
</Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <Grid item xs={12}>
    Profile Image
  </Grid>
  <Box>
    <input
      type="file"
      onChange={(e) => {
        // TODO: Handle onChange
      }}
      name="image"
    />
  </Box>
</Grid>
</Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <FormControl sx={{ minWidth: 120 }} 
  error={Boolean(formik.errors.selection)}
  >
    <InputLabel>Drop</InputLabel>
    <Select
      value={formik.values.selection}
      size="small"
      label="Drop"
      onChange={formik.handleChange}
      name="selection"
    >
      <MenuItem value="ten">Ten</MenuItem>
<MenuItem value="twenty">Twenty</MenuItem>
<MenuItem value="thirty">Thirty</MenuItem>
    </Select>
    { Boolean(formik.errors.selection) && <FormHelperText>{formik.errors.selection}</FormHelperText> }
  </FormControl>
</Grid>
  </Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <FormControl
    sx={{ flexGrow: 1, minWidth: 120 }}
    error={Boolean(formik.errors.color)}
  >
    <FormLabel>Favorite color</FormLabel>
    <RadioGroup
      defaultValue="female"
      name="color"
      value={formik.values.color}
      onChange={formik.handleChange}
    >
      <FormControlLabel
            value="green"
            control={<Radio />}
            label="Green"
          />
<FormControlLabel
            value="red"
            control={<Radio />}
            label="Red"
          />
<FormControlLabel
            value="blue"
            control={<Radio />}
            label="Blue"
          />
    </RadioGroup>
    { Boolean(formik.errors.color) && <FormHelperText>{formik.errors.color}</FormHelperText> }
  </FormControl>
</Grid>
  
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <FormControl
    sx={{ flexGrow: 1, minWidth: 120 }}
    error={Boolean(formik.errors.tune_level)}
  >
    <FormLabel>Tune level</FormLabel>
    <RadioGroup
      defaultValue="female"
      name="tune_level"
      value={formik.values.tune_level}
      onChange={formik.handleChange}
    >
      <FormControlLabel
            value={10}
            control={<Radio />}
            label="10"
          />
<FormControlLabel
            value={20}
            control={<Radio />}
            label="20"
          />
<FormControlLabel
            value={30}
            control={<Radio />}
            label="30"
          />
    </RadioGroup>
    { Boolean(formik.errors.tune_level) && <FormHelperText>{formik.errors.tune_level}</FormHelperText> }
  </FormControl>
</Grid>
  </Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item alignSelf="flex-start" sx={{ flexGrow: 1 }}>
  <FormControl error>
    <FormControlLabel
      control={<Checkbox name="conditions" checked={formik.values.conditions} onChange={formik.handleChange} />}
      label="Accept TOS"
    />
    { Boolean(formik.errors.conditions) && <FormHelperText>{formik.errors.conditions}</FormHelperText> }
  </FormControl>
</Grid>
</Grid><Grid container justifyContent="space-between" spacing={1} sx={{ mt: 2 }}>
<Grid item sx={{ flexGrow: undefined }} alignItems="flex-end">

  <Grid item>Created At</Grid>
  <Grid item alignItems="flex-end">
    <DatePicker
      selected={formik.values.created_at || new Date()}
      onChange={(e) => {
        formik.setFieldValue('created_at', e);
      }}
    />
  </Grid>
  <Grid item xs={12}>
    {formik.touched.created_at && formik.errors.created_at && (
      <FormHelperText error>
        {formik.errors.created_at}
      </FormHelperText>
    )}
  </Grid>
</Grid>
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

export default EditBlogForm;
