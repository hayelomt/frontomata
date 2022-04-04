import { FormikHelpers } from 'formik';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useSendApiData } from '../../../core/hooks/useSendApiData';
import constants from '../../../core/utils/constants';
import { toastError } from '../../../core/utils/ui/alert';
import { parseValidationErrors } from '../../../core/utils/validation';
import { LoginType, User } from '../auth';
import Login from '../components/Login';
import AuthContext from '../service/authContext';

type LoginResponse = {
  data: User;
  token: string;
};

const LoginContainer = () => {
  const navigate = useNavigate();
  const { user, saveUser } = useContext(AuthContext);
  const { callApi, loading } = useSendApiData();

  const handleSubmit = async (
    values: LoginType,
    { setFieldError }: FormikHelpers<LoginType>
  ) => {
    let success = false;

    await callApi({
      endpoint: `${constants.authUrl}/login`,
      data: values,
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async ({ data, token }: LoginResponse) => {
        saveUser!(data, token);
      },
    });

    if (success) navigate('/login', { replace: true });
  };

  if (user !== null) return <Navigate to="/" />;

  return (
    <>
      <Login onSubmit={handleSubmit} loading={loading} />
    </>
  );
};

export default LoginContainer;
