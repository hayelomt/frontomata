import { createContext, useState } from 'react';
import { User } from '../auth';
import constants from '../../../core/utils/constants';
import authService from './authService';
import { toastError } from '../../../core/utils/ui/alert';

interface ILoginContext {
  user: User | null;
  authLoading: boolean;
  saveUser?: (user: User, token: string) => void;
  checkAuth?: () => Promise<void>;
  logoutUser?: () => Promise<void>;
}

const AuthContext = createContext<ILoginContext>({
  user: null,
  authLoading: false,
});

export const useAuthContext = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = async () => {
    setAuthLoading(true);
    const user = authService.getUser();
    if (user && user.token) {
      const apiUser = await authService.checkUserApi(user.token);
      if (apiUser) {
        saveUser(apiUser, user.token);
      }
    }
    setAuthLoading(false);
  };

  const saveUser = (user: User, token: string) => {
    user.token = token;
    localStorage.setItem(constants.keys.user, JSON.stringify(user));
    setUser(user);
  };

  const logoutUser = async () => {
    if (await authService.logoutUserApi(user?.token || '')) {
      localStorage.removeItem(constants.keys.user);
      setUser(null);
    } else {
      toastError('Something went wrong logging out, try again');
    }
  };

  return { user, saveUser, authLoading, checkAuth, logoutUser };
};

export default AuthContext;
