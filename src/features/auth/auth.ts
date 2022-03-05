export type UserCredential = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  token: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type ProfileFormType = {
  currentPassword: string;
  password?: string;
  password_confirmation?: string;
  email?: string;
};
