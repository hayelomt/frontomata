import { FormikHelpers } from 'formik';
import { useContext } from 'react';
import { useSendApiData } from '../../../core/hooks/useSendApiData';
import constants from '../../../core/utils/constants';
import { toastError, toastMessage } from '../../../core/utils/ui/alert';
import { parseValidationErrors } from '../../../core/utils/validation';
import { ProfileFormType, User } from '../auth';
import Profile from '../components/Profile';
import AuthContext from '../service/authContext';

const ProfileContainer = () => {
  const { user, saveUser } = useContext(AuthContext);
  const { callApi, loading } = useSendApiData();

  const handleSubmit = async (
    values: ProfileFormType,
    { setFieldError }: FormikHelpers<ProfileFormType>
  ) => {
    let success = false;
    await callApi({
      endpoint: `${constants.authUrl}/profile`,
      data: values,
      method: 'patch',
      onValidationError: (err) => parseValidationErrors(err, setFieldError),
      onError: toastError,
      onSuccess: async (data: User) => {
        saveUser!(data, user!.token);
        toastMessage('Profile updated');
        success = true;
      },
    });

    return success;
  };

  return (
    <>
      <Profile onSubmit={handleSubmit} loading={loading} />
    </>
  );
};

export default ProfileContainer;
