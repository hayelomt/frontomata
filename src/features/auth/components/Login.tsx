import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import { Paper } from '@mui/material';
import { LoginType } from '../auth';
import { FormSubmit } from '../../../core/utils/types';

type LoginProps = {
  onSubmit: FormSubmit<LoginType>;
  loading: boolean;
};

const Login = ({ onSubmit, loading }: LoginProps) => {
  const initialValues: LoginType = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onSubmit,
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
            Login
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'Logging In' : 'Login'}
              </Button>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
