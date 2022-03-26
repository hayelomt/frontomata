import axios from 'axios';
import constants from '../../../core/utils/constants';
import { User } from '../auth';

const getUser = (): User | null => {
  let user: User | null = null;
  let savedUser = localStorage.getItem(constants.keys.user);

  if (savedUser) {
    user = JSON.parse(savedUser) as User;
  }

  return user;
};

const getToken = () => getUser()?.token || '';

const checkUserApi = async (token: string): Promise<User | null> => {
  try {
    const res = await axios.post(
      `${constants.apiUrl}/${constants.authUrl}/who-am-i`,
      {},
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data.data as User;
    }
  } catch (_) {}

  return null;
};

const logoutUserApi = async (token: string): Promise<boolean> => {
  try {
    const res = await axios.post(
      `${constants.apiUrl}/${constants.authUrl}/logout`,
      {},
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return true;
    }
  } catch (_) {}

  return false;
};

const authService = { getUser, checkUserApi, logoutUserApi, getToken };

export default authService;
