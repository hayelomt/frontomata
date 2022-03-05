import { useContext, useEffect } from 'react';
import { ReactChildren } from '../../../core/utils/types';
import AuthContext from '../service/authContext';

const AuthWrapper = ({ children }: ReactChildren) => {
  const { user, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!user) checkAuth!();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <> {children}</>;
};

export default AuthWrapper;
