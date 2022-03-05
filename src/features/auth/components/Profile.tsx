import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormikHelpers, useFormik } from 'formik';
import { Paper } from '@mui/material';
import { ProfileFormType } from '../auth';
import { FormSubmit } from '../../../core/utils/types';
import { useContext } from 'react';
import AuthContext from '../service/authContext';

type ProfileProps = {
  onSubmit: FormSubmit<ProfileFormType>;
  loading: boolean;
};

const Profile = ({ onSubmit, loading }: ProfileProps) => {
  const { user } = useContext(AuthContext);
  const initialValues: ProfileFormType = {
    email: user!.email,
    currentPassword: '',
    password: '',
    password_confirmation: '',
  };

  const handleSubmit = async (
    value: ProfileFormType,
    helpers: FormikHelpers<ProfileFormType>
  ) => {
    // console.log('reset form');
    // formik.resetForm();
    const success = await onSubmit(value, helpers);
    if (success) {
      formik.resetForm();
      formik.setFieldValue('email', value.email || user!.email);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="currentPassword"
                label="Current Password"
                type="password"
                id="currentPassword"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
                required
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password_confirmation"
                label="Password Confirmation"
                type="password"
                id="password_confirmation"
                size="small"
                onChange={formik.handleChange}
                value={formik.values.password_confirmation}
                error={
                  formik.touched.password_confirmation &&
                  Boolean(formik.errors.password_confirmation)
                }
                helperText={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'Updating' : 'Update'}
              </Button>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
