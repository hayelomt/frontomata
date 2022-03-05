import { toast } from 'react-toastify';

export const toastError = (error: string) => toast(error);

export const toastMessage = (message: string) => toast(message);
