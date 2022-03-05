import { useContext } from 'react';
import { Navigate } from 'react-router';
import Loading from '../../../core/ui/utility/Loading';
import { ReactChildren } from '../../../core/utils/types';
import AuthContext from '../service/authContext';

const PrivateRoute = ({ children }: ReactChildren) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) return <Loading />;

  return <>{user ? children : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
